package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/jmorbegoso/doujinshi-showcase/api/doujinshi/domain/repository"
	"github.com/jmorbegoso/doujinshi-showcase/api/presentation/handler"
)

func AddLibrariesController(routerGroup *gin.RouterGroup, doujinshiRepository repository.DoujinshiRepository) {
	routerGroup.POST("/refresh", handler.RefreshLibraryHandler(routerGroup, doujinshiRepository))
}
