package controller

import (
	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/doujinshi/domain/repository"
	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/presentation/handler"
	"github.com/gin-gonic/gin"
)

func AddCharactersController(routerGroup *gin.RouterGroup, doujinshiRepository repository.DoujinshiRepository) {
	subRouterGroup := routerGroup.Group("/characters")
	{
		subRouterGroup.GET("", handler.GetCharactersHandler(doujinshiRepository))
	}
}
