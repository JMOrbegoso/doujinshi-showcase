package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/jmorbegoso/doujinshi-showcase/api/doujinshi/domain/repository"
	"github.com/jmorbegoso/doujinshi-showcase/api/presentation/handler"
)

func AddTagsController(routerGroup *gin.RouterGroup, doujinshiRepository repository.DoujinshiRepository) {
	subRouterGroup := routerGroup.Group("/tags")
	{
		subRouterGroup.GET("", handler.GetTagsHandler(doujinshiRepository))
	}
}
