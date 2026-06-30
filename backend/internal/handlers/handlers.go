package handlers

import (
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"talita-umroh-api/internal/database"
	"talita-umroh-api/internal/models"
)

// Placeholder handlers — akan diimplementasi di Task 2.2
// File ini hanya agar proyek bisa di-compile sebelum Phase 2

func ForgotPassword(c *gin.Context)   { c.JSON(501, gin.H{"message": "not implemented"}) }
func ResetPassword(c *gin.Context)    { c.JSON(501, gin.H{"message": "not implemented"}) }

func GetProfile(c *gin.Context)    { c.JSON(501, gin.H{"message": "not implemented"}) }
func UpdateProfile(c *gin.Context) { c.JSON(501, gin.H{"message": "not implemented"}) }

func GetBanks(c *gin.Context)    { c.JSON(501, gin.H{"message": "not implemented"}) }
func AddBank(c *gin.Context)     { c.JSON(501, gin.H{"message": "not implemented"}) }
func DeleteBank(c *gin.Context)  { c.JSON(501, gin.H{"message": "not implemented"}) }

func GetPackages(c *gin.Context) {
	var packages []models.UmrohPackage
	if err := database.DB.Find(&packages).Error; err != nil {
		c.JSON(500, gin.H{"error": "Failed to fetch packages"})
		return
	}
	
	var response []gin.H
	for _, pkg := range packages {
		response = append(response, gin.H{
			"id": pkg.ID,
			"name": pkg.Name,
			"category": pkg.TravelType,
			"price": pkg.RegistrationFee,
			"duration_days": pkg.TravelDuration,
			"available_seats": pkg.Quota,
			"status": pkg.Status,
		})
	}
	
	c.JSON(200, gin.H{"data": response})
}

func CreateOrder(c *gin.Context)   { c.JSON(501, gin.H{"message": "not implemented"}) }
func GetMyOrders(c *gin.Context)   { c.JSON(501, gin.H{"message": "not implemented"}) }
func UploadPayment(c *gin.Context) { c.JSON(501, gin.H{"message": "not implemented"}) }

func GetMyCommissions(c *gin.Context) { c.JSON(501, gin.H{"message": "not implemented"}) }
func GetLedger(c *gin.Context)        { c.JSON(501, gin.H{"message": "not implemented"}) }

func RequestWithdraw(c *gin.Context)  { c.JSON(501, gin.H{"message": "not implemented"}) }
func GetMyWithdrawals(c *gin.Context) { c.JSON(501, gin.H{"message": "not implemented"}) }

func GetMarketingKits(c *gin.Context)    { c.JSON(501, gin.H{"message": "not implemented"}) }
func DownloadMarketingKit(c *gin.Context){ c.JSON(501, gin.H{"message": "not implemented"}) }

func ListAgents(c *gin.Context) {
	var users []models.User
	// Load agents (role='agent') and their AgentProfile
	if err := database.DB.Preload("AgentProfile").Where("role = ?", "agent").Find(&users).Error; err != nil {
		c.JSON(500, gin.H{"error": "Failed to fetch agents"})
		return
	}
	
	// Create simplified response
	var response []gin.H
	for _, user := range users {
		response = append(response, gin.H{
			"id": user.ID,
			"name": user.Name,
			"email": user.Email,
			"phone": user.Phone,
			"status": "Active",
			"created_at": user.CreatedAt,
		})
	}
	
	c.JSON(200, gin.H{"data": response})
}

func GetAgent(c *gin.Context) {
	id := c.Param("id")
	var user models.User
	
	if err := database.DB.Preload("AgentProfile").Where("id = ? AND role = ?", id, "agent").First(&user).Error; err != nil {
		c.JSON(404, gin.H{"error": "Agent not found"})
		return
	}
	
	c.JSON(200, gin.H{"data": user})
}

type PackagePayload struct {
	Name           string  `json:"name"`
	Category       string  `json:"category"`
	Price          float64 `json:"price"`
	DurationDays   int     `json:"duration_days"`
	AvailableSeats int     `json:"available_seats"`
	Status         string  `json:"status"`
}

func CreatePackage(c *gin.Context) {
	var payload PackagePayload
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	
	pkg := models.UmrohPackage{
		Name:            payload.Name,
		TravelType:      payload.Category,
		RegistrationFee: payload.Price,
		TravelDuration:  payload.DurationDays,
		Quota:           payload.AvailableSeats,
		Status:          payload.Status,
	}
	
	// Generate slug from name if empty
	if pkg.Slug == "" {
		pkg.Slug = strings.ToLower(strings.ReplaceAll(pkg.Name, " ", "-")) + "-" + uuid.New().String()[:8]
	}
	
	if err := database.DB.Create(&pkg).Error; err != nil {
		c.JSON(500, gin.H{"error": "Failed to create package: " + err.Error()})
		return
	}
	
	// map back to frontend format
	c.JSON(201, gin.H{"data": gin.H{
		"id": pkg.ID,
		"name": pkg.Name,
		"category": pkg.TravelType,
		"price": pkg.RegistrationFee,
		"duration_days": pkg.TravelDuration,
		"available_seats": pkg.Quota,
		"status": pkg.Status,
	}, "message": "Package created successfully"})
}

func UpdatePackage(c *gin.Context) {
	id := c.Param("id")
	var pkg models.UmrohPackage
	if err := database.DB.First(&pkg, id).Error; err != nil {
		c.JSON(404, gin.H{"error": "Package not found"})
		return
	}
	
	var payload PackagePayload
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	
	pkg.Name = payload.Name
	pkg.TravelType = payload.Category
	pkg.RegistrationFee = payload.Price
	pkg.TravelDuration = payload.DurationDays
	pkg.Quota = payload.AvailableSeats
	pkg.Status = payload.Status
	
	if pkg.Slug == "" {
		pkg.Slug = strings.ToLower(strings.ReplaceAll(pkg.Name, " ", "-")) + "-" + uuid.New().String()[:8]
	}
	
	database.DB.Save(&pkg)
	c.JSON(200, gin.H{"data": gin.H{
		"id": pkg.ID,
		"name": pkg.Name,
		"category": pkg.TravelType,
		"price": pkg.RegistrationFee,
		"duration_days": pkg.TravelDuration,
		"available_seats": pkg.Quota,
		"status": pkg.Status,
	}, "message": "Package updated successfully"})
}

func DeletePackage(c *gin.Context) {
	id := c.Param("id")
	if err := database.DB.Delete(&models.UmrohPackage{}, id).Error; err != nil {
		c.JSON(500, gin.H{"error": "Failed to delete package"})
		return
	}
	c.JSON(200, gin.H{"message": "Package deleted successfully"})
}

func ListAllOrders(c *gin.Context) {
	var orders []models.Transaction
	// Preload Agent and Package
	if err := database.DB.Preload("Agent").Preload("Package").Find(&orders).Error; err != nil {
		c.JSON(500, gin.H{"error": "Failed to fetch orders"})
		return
	}
	
	// Create response
	var response []gin.H
	for _, order := range orders {
		pkgName := "Paket Dihapus"
		if order.Package != nil {
			pkgName = order.Package.Name
		}
		agentName := "Agen Dihapus"
		if order.Agent != nil {
			agentName = order.Agent.Name
		}
		
		response = append(response, gin.H{
			"id": order.ID,
			"invoice_number": order.InvoiceNumber,
			"agent_name": agentName,
			"package_name": pkgName,
			"pax_count": order.BookingQty,
			"total_amount": order.TotalAmount,
			"status": order.Status,
			"created_at": order.CreatedAt,
		})
	}
	
	c.JSON(200, gin.H{"data": response})
}

func VerifyPayment(c *gin.Context) {
	id := c.Param("id")
	var order models.Transaction
	if err := database.DB.First(&order, id).Error; err != nil {
		c.JSON(404, gin.H{"error": "Order not found"})
		return
	}
	
	order.Status = "Paid" // Simplified status update
	database.DB.Save(&order)
	
	c.JSON(200, gin.H{"message": "Payment verified successfully", "data": order})
}

func RejectPayment(c *gin.Context) {
	id := c.Param("id")
	var order models.Transaction
	if err := database.DB.First(&order, id).Error; err != nil {
		c.JSON(404, gin.H{"error": "Order not found"})
		return
	}
	
	order.Status = "Rejected"
	database.DB.Save(&order)
	
	c.JSON(200, gin.H{"message": "Payment rejected successfully", "data": order})
}

func ListWithdrawals(c *gin.Context)   { c.JSON(501, gin.H{"message": "not implemented"}) }
func ApproveWithdraw(c *gin.Context)   { c.JSON(501, gin.H{"message": "not implemented"}) }
func RejectWithdraw(c *gin.Context)    { c.JSON(501, gin.H{"message": "not implemented"}) }

func UploadMarketingKit(c *gin.Context) { c.JSON(501, gin.H{"message": "not implemented"}) }
func DeleteMarketingKit(c *gin.Context) { c.JSON(501, gin.H{"message": "not implemented"}) }

func GetKPI(c *gin.Context) {
	c.JSON(200, gin.H{
		"total_jamaah": 1250,
		"active_agents": 45,
		"pending_transactions": 12,
		"total_revenue": 1500000000,
		"chart_data": []gin.H{
			{"name": "Jan", "jamaah": 150},
			{"name": "Feb", "jamaah": 200},
			{"name": "Mar", "jamaah": 180},
			{"name": "Apr", "jamaah": 250},
			{"name": "Mei", "jamaah": 210},
			{"name": "Jun", "jamaah": 260},
		},
	})
}
