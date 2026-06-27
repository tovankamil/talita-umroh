package helpers

import (
	"github.com/gin-gonic/gin"
)

// Response adalah format standar untuk HTTP response
type Response struct {
	Message string      `json:"message,omitempty"`
	Data    interface{} `json:"data,omitempty"`
	Error   string      `json:"error,omitempty"`
}

// SuccessResponse mengirim respons JSON sukses
func SuccessResponse(c *gin.Context, statusCode int, message string, data interface{}) {
	c.JSON(statusCode, Response{
		Message: message,
		Data:    data,
	})
}

// ErrorResponse mengirim respons JSON error
func ErrorResponse(c *gin.Context, statusCode int, errorMsg string) {
	c.JSON(statusCode, Response{
		Error: errorMsg,
	})
}
