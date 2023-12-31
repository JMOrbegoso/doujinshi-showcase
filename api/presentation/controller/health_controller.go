package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/jmorbegoso/doujinshi-showcase/api/presentation/handler"
)

func AddHealthController(routerGroup *gin.RouterGroup) {
	routerGroup.GET("", handler.GetHealthStatusHandler())
}
