package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/jmorbegoso/doujinshi-showcase/api/doujinshi/domain/repository"
	"github.com/jmorbegoso/doujinshi-showcase/api/presentation/handler"
)

func AddArtistsController(routerGroup *gin.RouterGroup, doujinshiRepository repository.DoujinshiRepository) {
	subRouterGroup := routerGroup.Group("/artists")
	{
		subRouterGroup.GET("", handler.GetArtistsHandler(doujinshiRepository))
	}
}
