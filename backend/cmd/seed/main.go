package main

import (
	"log"

	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
	"talita-umroh-api/internal/database"
	"talita-umroh-api/internal/models"
)

func main() {
	godotenv.Load("../.env") // Asumsi dijalankan dari cmd/seed
	godotenv.Load(".env")    // Asumsi dijalankan dari root backend

	database.Connect()

	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte("password123"), bcrypt.DefaultCost)

	user := models.User{
		Name:     "Mitra Dummy",
		Phone:    "08123456789",
		Email:    "mitra@talita.com",
		Password: string(hashedPassword),
		Role:     models.RoleAgent,
	}

	if err := database.DB.Where("email = ?", user.Email).FirstOrCreate(&user).Error; err != nil {
		log.Fatalf("Gagal membuat dummy agent: %v", err)
	}

	// Create AgentProfile
	profile := models.AgentProfile{UserID: user.ID}
	database.DB.Where("user_id = ?", user.ID).FirstOrCreate(&profile)

	log.Println("✅ Dummy Mitra (Agent) berhasil dibuat!")
	log.Println("Email:", user.Email)
	log.Println("Password: password123")
}
