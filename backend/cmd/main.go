package main

import (
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"talita-umroh-api/internal/database"
	"talita-umroh-api/internal/handlers"
	"talita-umroh-api/internal/repositories"
	"talita-umroh-api/internal/routes"
	"talita-umroh-api/internal/services"
)

func main() {
	// Load .env file dari direktori backend
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: .env file not found, using system environment variables")
	}

	// Connect to database & Redis
	database.Connect()
	database.ConnectRedis()

	// Jalankan database migration
	database.Migrate()

	// Initialize Dependencies (Clean Architecture)
	userRepo := repositories.NewUserRepository(database.DB)
	authService := services.NewAuthService(userRepo)
	authHandler := handlers.NewAuthHandler(authService)

	chatService := services.NewChatService(database.DB)
	chatHandler := handlers.NewChatHandler(chatService)

	// Setup Gin
	if os.Getenv("APP_ENV") == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	r := gin.Default()

	// CORS configuration
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{os.Getenv("FRONTEND_URL"), "http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	// Register all routes
	routes.Register(r, authHandler, chatHandler)

	port := os.Getenv("APP_PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("🚀 Server running on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
