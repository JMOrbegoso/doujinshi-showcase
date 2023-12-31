package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// @Summary Get API Health
// @Description Return the API Health.
// @Tags health
// @Produce plain
// @Success 200 {string} string
// @Router /api/health [GET]
func GetHealthStatusHandler() gin.HandlerFunc {
	fn := func(c *gin.Context) {
		c.String(http.StatusOK, "%v", "OK")
	}
	return fn
}
