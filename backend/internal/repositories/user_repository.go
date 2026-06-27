package repositories

import (
	"talita-umroh-api/internal/models"

	"gorm.io/gorm"
)

// UserRepository mendefinisikan interface untuk operasi data user
type UserRepository interface {
	FindByEmailOrPhone(email, phone string) (*models.User, error)
	FindByEmail(email string) (*models.User, error)
	FindByReferralCode(referralCode string) (*models.User, error)
	FindByIDWithProfile(id uint) (*models.User, error)
	CreateUserWithProfile(user *models.User) error
}

type userRepository struct {
	db *gorm.DB
}

// NewUserRepository adalah constructor untuk membuat instance UserRepository
func NewUserRepository(db *gorm.DB) UserRepository {
	return &userRepository{db: db}
}

func (r *userRepository) FindByEmailOrPhone(email, phone string) (*models.User, error) {
	var user models.User
	err := r.db.Where("email = ? OR phone = ?", email, phone).First(&user).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *userRepository) FindByEmail(email string) (*models.User, error) {
	var user models.User
	err := r.db.Where("email = ?", email).First(&user).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *userRepository) FindByReferralCode(referralCode string) (*models.User, error) {
	var user models.User
	err := r.db.Where("referral_code = ?", referralCode).First(&user).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *userRepository) FindByIDWithProfile(id uint) (*models.User, error) {
	var user models.User
	err := r.db.Preload("AgentProfile").First(&user, id).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *userRepository) CreateUserWithProfile(user *models.User) error {
	// Gunakan transaction agar jika gagal membuat profile, user tidak tersimpan
	return r.db.Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(user).Error; err != nil {
			return err
		}

		agentProfile := models.AgentProfile{
			UserID: user.ID,
		}
		if err := tx.Create(&agentProfile).Error; err != nil {
			return err
		}

		return nil
	})
}
