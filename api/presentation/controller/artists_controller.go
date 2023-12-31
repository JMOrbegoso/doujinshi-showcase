package controller

import (
	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/doujinshi/domain/repository"
	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/presentation/handler"
	"github.com/gin-gonic/gin"
)

func AddArtistsController(routerGroup *gin.RouterGroup, doujinshiRepository repository.DoujinshiRepository) {
	subRouterGroup := routerGroup.Group("/artists")
	{
		subRouterGroup.GET("", handler.GetArtistsHandler(doujinshiRepository))
	}
}
