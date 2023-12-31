package controller

import (
	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/doujinshi/domain/repository"
	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/presentation/handler"
	"github.com/gin-gonic/gin"
)

func AddLibrariesController(routerGroup *gin.RouterGroup, doujinshiRepository repository.DoujinshiRepository) {
	routerGroup.POST("/refresh", handler.RefreshLibraryHandler(routerGroup, doujinshiRepository))
}
