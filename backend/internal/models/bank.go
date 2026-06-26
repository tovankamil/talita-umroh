package models

import "time"

// MasterBank — daftar bank yang tersedia untuk agen
type MasterBank struct {
	ID       uint   `gorm:"primaryKey" json:"id"`
	BankCode string `gorm:"type:varchar(20);not null" json:"bank_code"` // BCA, BNI, BSI
	BankName string `gorm:"type:varchar(100);not null" json:"bank_name"`
	LogoURL  string `gorm:"type:varchar(255)" json:"logo_url"`
	Status   string `gorm:"type:varchar(20);default:'active'" json:"status"` // active/inactive
}

// AgentProfile — profil rekening bank agen untuk pencairan komisi
type AgentProfile struct {
	ID              uint    `gorm:"primaryKey" json:"id"`
	UserID          uint    `gorm:"uniqueIndex;not null" json:"user_id"`
	BankID          *uint   `gorm:"index" json:"bank_id"`
	BankAccountNo   string  `gorm:"type:varchar(30)" json:"bank_account_no"`
	AccountHolder   string  `gorm:"type:varchar(100)" json:"account_holder"`
	BankBranch      string  `gorm:"type:varchar(100)" json:"bank_branch"`
	TotalCommission float64 `gorm:"type:decimal(15,2);default:0" json:"total_commission"`

	// Relations
	User *User       `gorm:"foreignKey:UserID" json:"user,omitempty"`
	Bank *MasterBank `gorm:"foreignKey:BankID" json:"bank,omitempty"`
}

// CompanyBankAccount — rekening perusahaan tujuan pembayaran jamaah
type CompanyBankAccount struct {
	ID            uint   `gorm:"primaryKey" json:"id"`
	BankName      string `gorm:"type:varchar(100);not null" json:"bank_name"`
	AccountNumber string `gorm:"type:varchar(30);not null" json:"account_number"`
	AccountHolder string `gorm:"type:varchar(100);not null" json:"account_holder"`
	LogoURL       string `gorm:"type:varchar(255)" json:"logo_url"`
	Status        string `gorm:"type:varchar(20);default:'active'" json:"status"`
}

// AgentRegSettings — konfigurasi pendaftaran agen (DP, benefit, bonus)
type AgentRegSettings struct {
	ID          uint    `gorm:"primaryKey" json:"id"`
	DPAmount    float64 `gorm:"type:decimal(15,2);not null" json:"dp_amount"`
	Benefits    string  `gorm:"type:text" json:"benefits"`    // JSON array
	Bonuses     string  `gorm:"type:text" json:"bonuses"`     // JSON array
	Description string  `gorm:"type:text" json:"description"`
}

// SiteSettings — key-value pengaturan website
type SiteSettings struct {
	ID    uint   `gorm:"primaryKey" json:"id"`
	Key   string `gorm:"type:varchar(100);uniqueIndex;not null" json:"key"`
	Value string `gorm:"type:text" json:"value"`
}

// StaticPage — halaman konten statis (Privacy Policy, T&C)
type StaticPage struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Slug      string    `gorm:"type:varchar(100);uniqueIndex;not null" json:"slug"`
	Title     string    `gorm:"type:varchar(200);not null" json:"title"`
	Content   string    `gorm:"type:text" json:"content"`
	UpdatedAt time.Time `json:"updated_at"`
}

// AboutPage — konten halaman Tentang Kami
type AboutPage struct {
	ID          uint   `gorm:"primaryKey" json:"id"`
	ImageURL    string `gorm:"type:varchar(255)" json:"image_url"`
	Description string `gorm:"type:text" json:"description"`
	BadgeNumber string `gorm:"type:varchar(20)" json:"badge_number"`
	BadgeLabel  string `gorm:"type:varchar(100)" json:"badge_label"`
	Highlights  string `gorm:"type:text" json:"highlights"` // JSON array
	Legalities  string `gorm:"type:text" json:"legalities"` // JSON array
}
