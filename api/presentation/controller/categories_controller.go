package controller

import (
	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/doujinshi/domain/repository"
	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/presentation/handler"
	"github.com/gin-gonic/gin"
)

func AddCategoriesController(routerGroup *gin.RouterGroup, doujinshiRepository repository.DoujinshiRepository) {
	subRouterGroup := routerGroup.Group("/categories")
	{
		subRouterGroup.GET("", handler.GetCategoriesHandler(doujinshiRepository))
	}
}
