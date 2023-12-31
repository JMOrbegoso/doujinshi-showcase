package controller

import (
	"os"

	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/doujinshi/domain/repository"
	"github.com/gin-gonic/gin"
)

func AddImagesController(routerGroup *gin.RouterGroup, doujinshiRepository repository.DoujinshiRepository) {
	libraryDir := os.Getenv("LIBRARY_DIR")

	routerGroup.Static("", libraryDir)
}
