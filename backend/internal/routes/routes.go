package routes

import (
	"github.com/gin-gonic/gin"
	"talita-umroh-api/internal/handlers"
	"talita-umroh-api/internal/middleware"
)

// Register mendaftarkan semua rute API
func Register(r *gin.Engine, authHandler *handlers.AuthHandler) {
	// Health check
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "ok",
			"message": "Talita Umroh API is running",
		})
	})

	api := r.Group("/api/v1")
	{
		// ─────────────────────────────────────────
		// Auth routes (public)
		// ─────────────────────────────────────────
		auth := api.Group("/auth")
		{
			auth.POST("/register", authHandler.Register)
			auth.POST("/login", authHandler.Login)
			// TODO: Update these to use handler structs once implemented
			auth.POST("/forgot-password", handlers.ForgotPassword)
			auth.POST("/reset-password", handlers.ResetPassword)
			
			// Profile (Requires Auth)
			auth.GET("/me", middleware.AuthMiddleware(), authHandler.GetMe)
		}

		// ─────────────────────────────────────────
		// Agent routes (login required, role=agent)
		// ─────────────────────────────────────────
		agent := api.Group("/agent")
		agent.Use(middleware.AuthMiddleware(), middleware.RoleMiddleware("agent"))
		{
			// Profile
			agent.GET("/profile", handlers.GetProfile)
			agent.PUT("/profile", handlers.UpdateProfile)

			// Bank accounts
			agent.GET("/banks", handlers.GetBanks)
			agent.POST("/banks", handlers.AddBank)
			agent.DELETE("/banks/:id", handlers.DeleteBank)

			// Packages & Orders
			agent.GET("/packages", handlers.GetPackages)
			agent.POST("/orders", handlers.CreateOrder)
			agent.GET("/orders", handlers.GetMyOrders)
			agent.POST("/orders/:id/payment", handlers.UploadPayment)

			// Commission & Ledger
			agent.GET("/commissions", handlers.GetMyCommissions)
			agent.GET("/ledger", handlers.GetLedger)

			// Withdrawal
			agent.POST("/withdraw", handlers.RequestWithdraw)
			agent.GET("/withdrawals", handlers.GetMyWithdrawals)

			// Marketing Kits
			agent.GET("/marketing-kits", handlers.GetMarketingKits)
			agent.GET("/marketing-kits/:id/download", handlers.DownloadMarketingKit)
		}

		// ─────────────────────────────────────────
		// Admin routes (admin only)
		// ─────────────────────────────────────────
		admin := api.Group("/admin")
		admin.Use(middleware.AuthMiddleware(), middleware.RoleMiddleware("admin"))
		{
			// Agents management
			admin.GET("/agents", handlers.ListAgents)
			admin.GET("/agents/:id", handlers.GetAgent)

			// Packages management
			admin.POST("/packages", handlers.CreatePackage)
			admin.PUT("/packages/:id", handlers.UpdatePackage)
			admin.DELETE("/packages/:id", handlers.DeletePackage)

			// Transaction verification
			admin.GET("/orders", handlers.ListAllOrders)
			admin.PUT("/orders/:id/verify", handlers.VerifyPayment)
			admin.PUT("/orders/:id/reject", handlers.RejectPayment)

			// Withdrawal approval
			admin.GET("/withdrawals", handlers.ListWithdrawals)
			admin.PUT("/withdrawals/:id/approve", handlers.ApproveWithdraw)
			admin.PUT("/withdrawals/:id/reject", handlers.RejectWithdraw)

			// Marketing kits management
			admin.POST("/marketing-kits", handlers.UploadMarketingKit)
			admin.DELETE("/marketing-kits/:id", handlers.DeleteMarketingKit)

			// KPI Dashboard
			admin.GET("/kpi", handlers.GetKPI)
		}
	}
}
