package handler

import (
	"net/http"

	usecases "gitea.jmorbegoso.com/jm/doujinshi-showcase/api/doujinshi/application/use-cases"
	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/doujinshi/domain/repository"
	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/presentation/mapping"
	"github.com/gin-gonic/gin"
)

// @Summary Get doujinshi by Id
// @Description Get a doujinshi by Id.
// @Tags doujinshi
// @Produce json
// @Param   id  path  string  true  "Doujinshi ID"
// @Success 200 {object} dto.DoujinshiDto
// @Router /api/doujinshi/{id} [GET]
func GetDoujinshiByIdHandler(doujinshiRepository repository.DoujinshiRepository) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		id := c.Param("id")

		doujinshi, err := usecases.GetDoujinshibyIdUseCase(doujinshiRepository, id)
		if err != nil {
			c.String(http.StatusInternalServerError, "%v", err.Error())
			return
		}

		if doujinshi == nil {
			c.JSON(http.StatusOK, nil)
			return
		}

		doujinshiDto := mapping.DoujinshiToDto(*doujinshi)
		c.JSON(http.StatusOK, doujinshiDto)
	}
	return fn
}
