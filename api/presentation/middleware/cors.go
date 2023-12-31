package middleware

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func AddCors(ginEngine *gin.Engine) {
	corsHandlerFunction := cors.New(cors.Config{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{"GET", "POST"},
	})

	ginEngine.Use(corsHandlerFunction)
}
