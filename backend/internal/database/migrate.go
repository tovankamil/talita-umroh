package database

import (
	"log"

	"talita-umroh-api/internal/models"
)

// Migrate — jalankan auto migration semua tabel
func Migrate() {
	log.Println("🔄 Menjalankan database migration...")

	err := DB.AutoMigrate(
		// Core entities
		&models.User{},
		&models.MasterBank{},
		&models.AgentProfile{},
		&models.CompanyBankAccount{},

		// Package entities
		&models.UmrohPackage{},
		&models.PackageDeparture{},
		&models.PackageRoomType{},
		&models.PackageItinerary{},

		// Transaction entities
		&models.Transaction{},
		&models.Commission{},
		&models.Withdrawal{},
		&models.MarketingKit{},

		// CMS entities
		&models.HeroSlider{},
		&models.Testimonial{},
		&models.Gallery{},

		// Settings entities
		&models.AgentRegSettings{},
		&models.SiteSettings{},
		&models.StaticPage{},
		&models.AboutPage{},
	)

	if err != nil {
		log.Fatalf("❌ Migration gagal: %v", err)
	}

	log.Println("✅ Migration selesai")
}
