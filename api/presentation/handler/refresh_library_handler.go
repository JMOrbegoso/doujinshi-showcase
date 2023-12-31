package handler

import (
	"net/http"

	usecases "gitea.jmorbegoso.com/jm/doujinshi-showcase/api/doujinshi/application/use-cases"
	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/doujinshi/domain/repository"
	"github.com/gin-gonic/gin"
)

// @Summary Refresh Library
// @Description Remove all doujinshi from the library and scan the directory of the library.
// @Tags library
// @Success 200
// @Success 500 {string} string
// @Router /api/library/refresh [POST]
func RefreshLibraryHandler(rg *gin.RouterGroup, doujinshiRepository repository.DoujinshiRepository) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		if err := usecases.RefreshLibraryUseCase(doujinshiRepository); err != nil {
			c.String(http.StatusInternalServerError, "%v", err.Error())
			return
		}

		c.Status(http.StatusOK)
	}
	return fn
}
