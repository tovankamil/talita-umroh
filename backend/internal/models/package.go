package models

import (
	"time"

	"gorm.io/gorm"
)

// UmrohPackage — paket perjalanan umroh/haji
type UmrohPackage struct {
	ID                  uint           `gorm:"primaryKey" json:"id"`
	Name                string         `gorm:"type:varchar(200);not null" json:"name"`
	Slug                string         `gorm:"type:varchar(200);uniqueIndex;not null" json:"slug"`
	TravelType          string         `gorm:"type:varchar(20);not null" json:"travel_type"` // umroh/haji
	TravelDuration      int            `gorm:"not null" json:"travel_duration"`               // hari
	RegistrationFee     float64        `gorm:"type:decimal(15,2);not null" json:"registration_fee"`
	AgentCommission     float64        `gorm:"type:decimal(15,2);not null" json:"agent_commission"`
	Perks               string         `gorm:"type:text" json:"perks"`                // JSON array
	FacilitiesIncluded  string         `gorm:"type:text" json:"facilities_included"`  // JSON array
	FacilitiesExcluded  string         `gorm:"type:text" json:"facilities_excluded"`  // JSON array
	Requirements        string         `gorm:"type:text" json:"requirements"`         // JSON array
	Terms               string         `gorm:"type:text" json:"terms"`
	ImageURL            string         `gorm:"type:varchar(255)" json:"image_url"`
	FlyerURL            string         `gorm:"type:varchar(255)" json:"flyer_url"`
	Quota               int            `gorm:"default:0" json:"quota"`
	Booked              int            `gorm:"default:0" json:"booked"`
	UseCustomCommission bool           `gorm:"default:false" json:"use_custom_commission"`
	CommissionConfig    string         `gorm:"type:text" json:"commission_config"` // JSON
	Status              string         `gorm:"type:varchar(20);default:'active'" json:"status"`
	CreatedAt           time.Time      `json:"created_at"`
	UpdatedAt           time.Time      `json:"updated_at"`
	DeletedAt           gorm.DeletedAt `gorm:"index" json:"-"`

	// Relations
	Departures  []PackageDeparture  `gorm:"foreignKey:PackageID" json:"departures,omitempty"`
	RoomTypes   []PackageRoomType   `gorm:"foreignKey:PackageID" json:"room_types,omitempty"`
	Itineraries []PackageItinerary  `gorm:"foreignKey:PackageID" json:"itineraries,omitempty"`
}

// PackageDeparture — jadwal keberangkatan paket
type PackageDeparture struct {
	ID            uint      `gorm:"primaryKey" json:"id"`
	PackageID     uint      `gorm:"index;not null" json:"package_id"`
	DepartureDate time.Time `gorm:"not null" json:"departure_date"`
	Label         string    `gorm:"type:varchar(100)" json:"label"` // "Bebas Tentukan Jadwal"
	QuotaOverride *int      `json:"quota_override,omitempty"`

	Package *UmrohPackage `gorm:"foreignKey:PackageID" json:"package,omitempty"`
}

// PackageRoomType — tipe kamar dan harga
type PackageRoomType struct {
	ID          uint    `gorm:"primaryKey" json:"id"`
	PackageID   uint    `gorm:"index;not null" json:"package_id"`
	RoomType    string  `gorm:"type:varchar(20);not null" json:"room_type"` // Quad, Triple, Double
	Description string  `gorm:"type:varchar(100)" json:"description"`       // "Sekamar berempat"
	Price       float64 `gorm:"type:decimal(15,2);not null" json:"price"`

	Package *UmrohPackage `gorm:"foreignKey:PackageID" json:"package,omitempty"`
}

// PackageItinerary — jadwal perjalanan harian
type PackageItinerary struct {
	ID          uint   `gorm:"primaryKey" json:"id"`
	PackageID   uint   `gorm:"index;not null" json:"package_id"`
	DayNumber   int    `gorm:"not null" json:"day_number"`
	Title       string `gorm:"type:varchar(200);not null" json:"title"` // "Hari Ke-1 KNO MEDAN"
	Description string `gorm:"type:text" json:"description"`

	Package *UmrohPackage `gorm:"foreignKey:PackageID" json:"package,omitempty"`
}
