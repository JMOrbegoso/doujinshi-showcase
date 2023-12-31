package middleware

import (
	"github.com/gin-gonic/gin"
)

func AddMiddlewares(ginEngine *gin.Engine) {
	AddCors(ginEngine)
}
