package controller

import (
	"os"

	"github.com/gin-gonic/gin"
	"github.com/jmorbegoso/doujinshi-showcase/api/doujinshi/domain/repository"
)

func AddImagesController(routerGroup *gin.RouterGroup, doujinshiRepository repository.DoujinshiRepository) {
	libraryDir := os.Getenv("LIBRARY_DIR")

	routerGroup.Static("", libraryDir)
}
