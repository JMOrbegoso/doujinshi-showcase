package controller

import (
	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/doujinshi/domain/repository"
	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/presentation/handler"
	"github.com/gin-gonic/gin"
)

func AddTagsController(routerGroup *gin.RouterGroup, doujinshiRepository repository.DoujinshiRepository) {
	subRouterGroup := routerGroup.Group("/tags")
	{
		subRouterGroup.GET("", handler.GetTagsHandler(doujinshiRepository))
	}
}
