package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// User roles
const (
	RoleAdmin  = "admin"
	RoleAgent  = "agent"
)

// User adalah model utama untuk semua pengguna sistem
type User struct {
	ID                  uint           `gorm:"primaryKey" json:"id"`
	Role                string         `gorm:"type:varchar(20);not null;default:'agent'" json:"role"`
	Name                string         `gorm:"type:varchar(100);not null" json:"name"`
	Phone               string         `gorm:"type:varchar(20);uniqueIndex;not null" json:"phone"`
	Email               string         `gorm:"type:varchar(100);uniqueIndex;not null" json:"email"`
	Password            string         `gorm:"type:varchar(255);not null" json:"-"`
	ReferralCode        string         `gorm:"type:varchar(20);uniqueIndex" json:"referral_code"`
	ReferredByID        *uint          `gorm:"index" json:"referred_by_id,omitempty"`
	ForcePasswordChange bool           `gorm:"default:false" json:"force_password_change"`
	CreatedAt           time.Time      `json:"created_at"`
	UpdatedAt           time.Time      `json:"updated_at"`
	DeletedAt           gorm.DeletedAt `gorm:"index" json:"-"`

	// Relations
	ReferredBy   *User        `gorm:"foreignKey:ReferredByID" json:"referred_by,omitempty"`
	AgentProfile *AgentProfile `gorm:"foreignKey:UserID" json:"agent_profile,omitempty"`
}

// BeforeCreate — generate referral code otomatis
func (u *User) BeforeCreate(tx *gorm.DB) error {
	if u.ReferralCode == "" {
		u.ReferralCode = uuid.New().String()[:8]
	}
	return nil
}
