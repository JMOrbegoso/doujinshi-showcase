package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	usecases "github.com/jmorbegoso/doujinshi-showcase/api/doujinshi/application/use-cases"
	"github.com/jmorbegoso/doujinshi-showcase/api/doujinshi/domain/repository"
)

// @Summary Get the doujinshi urls
// @Description Get all the doujinshi urls from the doujinshi library.
// @Tags urls
// @Produce json
// @Success 200 {array}  string
// @Success 500 {string} string
// @Router /api/doujinshi/urls [GET]
func GetUrlsHandler(doujinshiRepository repository.DoujinshiRepository) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		urls, err := usecases.GetUrlsUseCase(doujinshiRepository)
		if err != nil {
			c.String(http.StatusInternalServerError, "%v", err.Error())
			return
		}

		c.JSON(http.StatusOK, urls)
	}
	return fn
}
