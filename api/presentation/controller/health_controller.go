package controller

import (
	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/presentation/handler"
	"github.com/gin-gonic/gin"
)

func AddHealthController(routerGroup *gin.RouterGroup) {
	routerGroup.GET("", handler.GetHealthStatusHandler())
}
