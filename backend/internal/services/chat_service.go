package services

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"time"

	"gorm.io/gorm"
	"talita-umroh-api/internal/models"
)

type ChatService struct {
	DB           *gorm.DB
	APIKey       string
	BaseURL      string
	Model        string
	SystemPrompt string
}

func NewChatService(db *gorm.DB) *ChatService {
	sysPrompt := `Kamu adalah asisten virtual resmi dari "Talita Umroh".
Tugasmu adalah menjawab pertanyaan pengguna dengan ramah, profesional, dan persuasif. 
Berikut adalah basis pengetahuan (Knowledge Base) mengenai perusahaan kami:

Profil Perusahaan:
Fokus pada penyelenggaraan paket Umroh dan Haji Khusus dengan layanan profesional, transparan, dan berizin resmi.

Daftar Paket & Harga Estimasi (2026):
1. Umroh Reguler (9 Hari)
   - Harga: Rp 29.900.000
   - Fasilitas: Tiket pesawat, hotel bintang 3/4, makan, visa, mutawif.
2. Umroh Premium (12 Hari)
   - Harga: Rp 39.900.000
   - Fasilitas: Hotel dekat Masjidil Haram/Nabawi, city tour.
3. Umroh VIP (12 Hari)
   - Harga: Rp 55.000.000
   - Fasilitas: Hotel bintang 5, lounge, layanan eksklusif.
4. Haji Khusus (±25 Hari)
   - Harga: Rp 190.000.000 – Rp 350.000.000
   - Fasilitas: Sesuai kuota & kebijakan penyelenggara.

Instruksi Tambahan:
- Selalu gunakan bahasa Indonesia yang baik dan sopan (sapa dengan "Bapak/Ibu" atau sapaan hangat Islami seperti "Assalamu'alaikum").
- Jika ditanya hal di luar konteks umroh/haji/layanan travel, arahkan kembali pembicaraan ke layanan Talita Umroh secara sopan.
- Jika pengguna ingin berkonsultasi lebih lanjut, informasikan bahwa mereka bisa klik tombol WhatsApp di layar untuk terhubung langsung dengan Customer Service kami.`

	return &ChatService{
		DB:           db,
		APIKey:       "sk-dbdc62fe65015b3a-risim0-c14f3618",
		BaseURL:      "http://localhost:20128/v1/chat/completions",
		Model:        "tfn-combo", // Sesuai dengan konfigurasi 9router
		SystemPrompt: sysPrompt,
	}
}

// SetSystemPrompt meng-update prompt dengan konten PDF (akan dipanggil nanti)
func (s *ChatService) SetSystemPrompt(prompt string) {
	s.SystemPrompt = prompt
}

// StartSession membuat sesi chat baru
func (s *ChatService) StartSession(name, email, whatsapp string) (*models.ChatSession, error) {
	session := &models.ChatSession{
		Name:     name,
		Email:    email,
		Whatsapp: whatsapp,
	}

	if err := s.DB.Create(session).Error; err != nil {
		return nil, err
	}

	return session, nil
}

// ProcessMessage menyimpan pesan user, memanggil OpenRouter, dan menyimpan balasan bot
func (s *ChatService) ProcessMessage(sessionID string, userMessage string) (*models.ChatMessage, error) {
	// 1. Simpan pesan user
	userMsg := &models.ChatMessage{
		SessionID: sessionID,
		Sender:    "user",
		Message:   userMessage,
	}
	if err := s.DB.Create(userMsg).Error; err != nil {
		return nil, err
	}

	// 2. Ambil riwayat percakapan untuk konteks (ambil 10 pesan terakhir)
	var history []models.ChatMessage
	if err := s.DB.Where("session_id = ?", sessionID).Order("created_at asc").Limit(10).Find(&history).Error; err != nil {
		log.Printf("Gagal mengambil riwayat chat: %v", err)
	}

	// 3. Siapkan payload OpenRouter
	type openAIMessage struct {
		Role    string `json:"role"`
		Content string `json:"content"`
	}

	messages := []openAIMessage{
		{Role: "system", Content: s.SystemPrompt},
	}

	for _, msg := range history {
		role := "user"
		if msg.Sender == "bot" {
			role = "assistant"
		}
		messages = append(messages, openAIMessage{Role: role, Content: msg.Message})
	}

	payload := map[string]interface{}{
		"model":    s.Model,
		"messages": messages,
	}

	payloadBytes, err := json.Marshal(payload)
	if err != nil {
		return nil, err
	}

	// 4. Panggil API OpenRouter (format OpenAI)
	req, err := http.NewRequest("POST", s.BaseURL, bytes.NewBuffer(payloadBytes))
	if err != nil {
		return nil, err
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+s.APIKey)

	client := &http.Client{Timeout: 30 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		log.Printf("Error memanggil LLM API: %v", err)
		return nil, errors.New("gagal menghubungi asisten AI")
	}
	defer resp.Body.Close()

	bodyBytes, _ := io.ReadAll(resp.Body)
	if resp.StatusCode != http.StatusOK {
		log.Printf("LLM API Error %d: %s", resp.StatusCode, string(bodyBytes))
		return nil, fmt.Errorf("LLM error: %d", resp.StatusCode)
	}

	// 5. Parse balasan
	var result map[string]interface{}
	if err := json.Unmarshal(bodyBytes, &result); err != nil {
		return nil, err
	}

	botReply := "Maaf, saya tidak mengerti."
	if choices, ok := result["choices"].([]interface{}); ok && len(choices) > 0 {
		if choice, ok := choices[0].(map[string]interface{}); ok {
			if msg, ok := choice["message"].(map[string]interface{}); ok {
				if content, ok := msg["content"].(string); ok {
					botReply = content
				}
			}
		}
	}

	// 6. Simpan balasan bot
	botMsg := &models.ChatMessage{
		SessionID: sessionID,
		Sender:    "bot",
		Message:   botReply,
	}
	if err := s.DB.Create(botMsg).Error; err != nil {
		return nil, err
	}

	return botMsg, nil
}
