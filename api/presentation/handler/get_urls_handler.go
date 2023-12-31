package handler

import (
	"net/http"

	usecases "gitea.jmorbegoso.com/jm/doujinshi-showcase/api/doujinshi/application/use-cases"
	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/doujinshi/domain/repository"
	"github.com/gin-gonic/gin"
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
