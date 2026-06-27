package main

import (
	"log"

	"talita-umroh-api/internal/database"
	"talita-umroh-api/internal/models"

	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load(".env")
	database.Connect()

	result := database.DB.Model(&models.User{}).Where("email = ?", "qa4@talita.com").Update("name", "Ahmad Fauzi")
	
	if result.Error != nil {
		log.Fatalf("Failed to update: %v", result.Error)
	}
	
	log.Printf("Successfully updated name. Rows affected: %d", result.RowsAffected)
}
