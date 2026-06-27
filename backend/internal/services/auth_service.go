package services

import (
	"errors"

	"golang.org/x/crypto/bcrypt"
	"talita-umroh-api/internal/models"
	"talita-umroh-api/internal/repositories"
	"talita-umroh-api/internal/utils"
)

// AuthService mendefinisikan interface untuk logika autentikasi
type AuthService interface {
	Register(name, phone, email, password, referralCode string) (*models.User, string, error)
	Login(email, password string) (*models.User, string, error)
	GetMe(userID uint) (*models.User, error)
}

type authService struct {
	userRepo repositories.UserRepository
}

// NewAuthService adalah constructor untuk membuat instance AuthService
func NewAuthService(userRepo repositories.UserRepository) AuthService {
	return &authService{userRepo: userRepo}
}

func (s *authService) Register(name, phone, email, password, referralCode string) (*models.User, string, error) {
	// 1. Cek duplikasi email / phone
	existingUser, _ := s.userRepo.FindByEmailOrPhone(email, phone)
	if existingUser != nil {
		return nil, "", errors.New("email or phone already registered")
	}

	// 2. Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return nil, "", errors.New("failed to hash password")
	}

	// 3. Handle referral code
	var referredByID *uint
	if referralCode != "" {
		referrer, err := s.userRepo.FindByReferralCode(referralCode)
		if err == nil && referrer != nil {
			referredByID = &referrer.ID
		}
	}

	// 4. Siapkan user model
	user := &models.User{
		Name:         name,
		Email:        email,
		Phone:        phone,
		Password:     string(hashedPassword),
		Role:         models.RoleAgent, // default role
		ReferredByID: referredByID,
	}

	// 5. Simpan user (dan otomatis profilnya di repository)
	if err := s.userRepo.CreateUserWithProfile(user); err != nil {
		return nil, "", errors.New("failed to create user")
	}

	// 6. Generate JWT token
	token, err := utils.GenerateJWT(user.ID, user.Role)
	if err != nil {
		return nil, "", errors.New("failed to generate token")
	}

	return user, token, nil
}

func (s *authService) Login(email, password string) (*models.User, string, error) {
	// 1. Cari user berdasarkan email
	user, err := s.userRepo.FindByEmail(email)
	if err != nil || user == nil {
		return nil, "", errors.New("invalid email or password")
	}

	// 2. Bandingkan password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		return nil, "", errors.New("invalid email or password")
	}

	// 3. Generate token
	token, err := utils.GenerateJWT(user.ID, user.Role)
	if err != nil {
		return nil, "", errors.New("failed to generate token")
	}

	return user, token, nil
}

func (s *authService) GetMe(userID uint) (*models.User, error) {
	user, err := s.userRepo.FindByIDWithProfile(userID)
	if err != nil {
		return nil, errors.New("user not found")
	}
	return user, nil
}
