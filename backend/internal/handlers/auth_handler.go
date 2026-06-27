package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"talita-umroh-api/internal/helpers"
	"talita-umroh-api/internal/services"
)

// AuthHandler menangani request terkait autentikasi
type AuthHandler struct {
	authService services.AuthService
}

// NewAuthHandler adalah constructor untuk AuthHandler
func NewAuthHandler(authService services.AuthService) *AuthHandler {
	return &AuthHandler{authService: authService}
}

type RegisterRequest struct {
	Name         string `json:"name" binding:"required"`
	Phone        string `json:"phone" binding:"required"`
	Email        string `json:"email" binding:"required,email"`
	Password     string `json:"password" binding:"required,min=6"`
	ReferralCode string `json:"referral_code"` // Optional
}

type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

// Register untuk agen baru
func (h *AuthHandler) Register(c *gin.Context) {
	var req RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		helpers.ErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	user, token, err := h.authService.Register(req.Name, req.Phone, req.Email, req.Password, req.ReferralCode)
	if err != nil {
		if err.Error() == "email or phone already registered" {
			helpers.ErrorResponse(c, http.StatusConflict, err.Error())
		} else {
			helpers.ErrorResponse(c, http.StatusInternalServerError, err.Error())
		}
		return
	}

	helpers.SuccessResponse(c, http.StatusCreated, "Registration successful", gin.H{
		"token": token,
		"user": gin.H{
			"id":    user.ID,
			"name":  user.Name,
			"email": user.Email,
			"role":  user.Role,
		},
	})
}

// Login authentication
func (h *AuthHandler) Login(c *gin.Context) {
	var req LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		helpers.ErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	user, token, err := h.authService.Login(req.Email, req.Password)
	if err != nil {
		helpers.ErrorResponse(c, http.StatusUnauthorized, err.Error())
		return
	}

	helpers.SuccessResponse(c, http.StatusOK, "Login successful", gin.H{
		"token": token,
		"user": gin.H{
			"id":    user.ID,
			"name":  user.Name,
			"email": user.Email,
			"role":  user.Role,
		},
	})
}

// GetMe mengambil data user yang sedang login
func (h *AuthHandler) GetMe(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		helpers.ErrorResponse(c, http.StatusUnauthorized, "Unauthorized")
		return
	}

	// Cast ke uint
	uid, ok := userID.(float64) // JWT claims usually parse numbers as float64
	if !ok {
		// handle if user_id is passed as uint or something else
		if v, ok := userID.(uint); ok {
			uid = float64(v)
		} else {
			helpers.ErrorResponse(c, http.StatusInternalServerError, "Invalid token claims")
			return
		}
	}

	user, err := h.authService.GetMe(uint(uid))
	if err != nil {
		helpers.ErrorResponse(c, http.StatusNotFound, err.Error())
		return
	}

	helpers.SuccessResponse(c, http.StatusOK, "User retrieved successfully", gin.H{
		"id":            user.ID,
		"name":          user.Name,
		"email":         user.Email,
		"phone":         user.Phone,
		"role":          user.Role,
		"referral_code": user.ReferralCode,
		"created_at":    user.CreatedAt,
		"agent_profile": user.AgentProfile,
	})
}
