package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// ChatSession mewakili satu sesi obrolan chatbot untuk seorang jamaah
type ChatSession struct {
	ID        string         `gorm:"type:uuid;primaryKey" json:"id"`
	Name      string         `gorm:"type:varchar(100);not null" json:"name"`
	Email     string         `gorm:"type:varchar(100);not null" json:"email"`
	Whatsapp  string         `gorm:"type:varchar(20);not null" json:"whatsapp"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`

	// Relations
	Messages []ChatMessage `gorm:"foreignKey:SessionID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"messages,omitempty"`
}

// ChatMessage mewakili pesan individu dalam sesi obrolan
type ChatMessage struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	SessionID string         `gorm:"type:uuid;not null;index" json:"session_id"`
	Sender    string         `gorm:"type:varchar(20);not null" json:"sender"` // "user" or "bot"
	Message   string         `gorm:"type:text;not null" json:"message"`
	CreatedAt time.Time      `json:"created_at"`
}

// BeforeCreate — generate UUID untuk Session
func (s *ChatSession) BeforeCreate(tx *gorm.DB) error {
	if s.ID == "" {
		s.ID = uuid.New().String()
	}
	return nil
}
