package handlers

import "github.com/gin-gonic/gin"

// Placeholder handlers — akan diimplementasi di Task 2.2
// File ini hanya agar proyek bisa di-compile sebelum Phase 2

func ForgotPassword(c *gin.Context)   { c.JSON(501, gin.H{"message": "not implemented"}) }
func ResetPassword(c *gin.Context)    { c.JSON(501, gin.H{"message": "not implemented"}) }

func GetProfile(c *gin.Context)    { c.JSON(501, gin.H{"message": "not implemented"}) }
func UpdateProfile(c *gin.Context) { c.JSON(501, gin.H{"message": "not implemented"}) }

func GetBanks(c *gin.Context)    { c.JSON(501, gin.H{"message": "not implemented"}) }
func AddBank(c *gin.Context)     { c.JSON(501, gin.H{"message": "not implemented"}) }
func DeleteBank(c *gin.Context)  { c.JSON(501, gin.H{"message": "not implemented"}) }

func GetPackages(c *gin.Context)   { c.JSON(501, gin.H{"message": "not implemented"}) }
func CreateOrder(c *gin.Context)   { c.JSON(501, gin.H{"message": "not implemented"}) }
func GetMyOrders(c *gin.Context)   { c.JSON(501, gin.H{"message": "not implemented"}) }
func UploadPayment(c *gin.Context) { c.JSON(501, gin.H{"message": "not implemented"}) }

func GetMyCommissions(c *gin.Context) { c.JSON(501, gin.H{"message": "not implemented"}) }
func GetLedger(c *gin.Context)        { c.JSON(501, gin.H{"message": "not implemented"}) }

func RequestWithdraw(c *gin.Context)  { c.JSON(501, gin.H{"message": "not implemented"}) }
func GetMyWithdrawals(c *gin.Context) { c.JSON(501, gin.H{"message": "not implemented"}) }

func GetMarketingKits(c *gin.Context)    { c.JSON(501, gin.H{"message": "not implemented"}) }
func DownloadMarketingKit(c *gin.Context){ c.JSON(501, gin.H{"message": "not implemented"}) }

func ListAgents(c *gin.Context)  { c.JSON(501, gin.H{"message": "not implemented"}) }
func GetAgent(c *gin.Context)    { c.JSON(501, gin.H{"message": "not implemented"}) }

func CreatePackage(c *gin.Context) { c.JSON(501, gin.H{"message": "not implemented"}) }
func UpdatePackage(c *gin.Context) { c.JSON(501, gin.H{"message": "not implemented"}) }
func DeletePackage(c *gin.Context) { c.JSON(501, gin.H{"message": "not implemented"}) }

func ListAllOrders(c *gin.Context) { c.JSON(501, gin.H{"message": "not implemented"}) }
func VerifyPayment(c *gin.Context) { c.JSON(501, gin.H{"message": "not implemented"}) }
func RejectPayment(c *gin.Context) { c.JSON(501, gin.H{"message": "not implemented"}) }

func ListWithdrawals(c *gin.Context)   { c.JSON(501, gin.H{"message": "not implemented"}) }
func ApproveWithdraw(c *gin.Context)   { c.JSON(501, gin.H{"message": "not implemented"}) }
func RejectWithdraw(c *gin.Context)    { c.JSON(501, gin.H{"message": "not implemented"}) }

func UploadMarketingKit(c *gin.Context) { c.JSON(501, gin.H{"message": "not implemented"}) }
func DeleteMarketingKit(c *gin.Context) { c.JSON(501, gin.H{"message": "not implemented"}) }

func GetKPI(c *gin.Context) { c.JSON(501, gin.H{"message": "not implemented"}) }
