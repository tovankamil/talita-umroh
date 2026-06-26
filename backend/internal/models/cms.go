package models

import "time"

// HeroSlider — gambar slider di halaman beranda
type HeroSlider struct {
	ID         uint   `gorm:"primaryKey" json:"id"`
	ImageURL   string `gorm:"type:varchar(255);not null" json:"image_url"`
	Heading    string `gorm:"type:varchar(200)" json:"heading"`
	Subheading string `gorm:"type:varchar(300)" json:"subheading"`
	CTAText    string `gorm:"type:varchar(100)" json:"cta_text"`
	CTAURL     string `gorm:"type:varchar(255)" json:"cta_url"`
	SortOrder  int    `gorm:"default:0" json:"sort_order"`
	IsActive   bool   `gorm:"default:true" json:"is_active"`
}

// Testimonial — testimoni jamaah
type Testimonial struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Name      string    `gorm:"type:varchar(100);not null" json:"name"`
	PhotoURL  string    `gorm:"type:varchar(255)" json:"photo_url"`
	Content   string    `gorm:"type:text;not null" json:"content"`
	Rating    int       `gorm:"default:5" json:"rating"` // 1-5
	IsActive  bool      `gorm:"default:true" json:"is_active"`
	CreatedAt time.Time `json:"created_at"`
}

// Gallery — foto dan video galeri
type Gallery struct {
	ID           uint      `gorm:"primaryKey" json:"id"`
	Title        string    `gorm:"type:varchar(200)" json:"title"`
	MediaType    string    `gorm:"type:varchar(20)" json:"media_type"`  // image, video
	MediaKind    string    `gorm:"type:varchar(20)" json:"media_kind"`  // file, youtube
	FileURL      string    `gorm:"type:varchar(255)" json:"file_url"`
	ThumbnailURL string    `gorm:"type:varchar(255)" json:"thumbnail_url"`
	SortOrder    int       `gorm:"default:0" json:"sort_order"`
	CreatedAt    time.Time `json:"created_at"`
}
