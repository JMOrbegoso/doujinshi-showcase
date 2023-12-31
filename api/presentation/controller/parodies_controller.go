package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/jmorbegoso/doujinshi-showcase/api/doujinshi/domain/repository"
	"github.com/jmorbegoso/doujinshi-showcase/api/presentation/handler"
)

func AddParodiesController(routerGroup *gin.RouterGroup, doujinshiRepository repository.DoujinshiRepository) {
	subRouterGroup := routerGroup.Group("/parodies")
	{
		subRouterGroup.GET("", handler.GetParodiesHandler(doujinshiRepository))
	}
}
