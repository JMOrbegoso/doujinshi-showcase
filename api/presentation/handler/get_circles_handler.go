package handler

import (
	"net/http"
	"sort"
	"strings"

	usecases "gitea.jmorbegoso.com/jm/doujinshi-showcase/api/doujinshi/application/use-cases"
	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/doujinshi/domain/repository"
	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/presentation/dto"
	mapping "gitea.jmorbegoso.com/jm/doujinshi-showcase/api/presentation/mapping"
	"github.com/gin-gonic/gin"
)

// @Summary Get circles
// @Description Get all the circles from the doujinshi library.
// @Tags circles
// @Produce json
// @Success 200 {array}  dto.CircleDto
// @Success 500 {string} string
// @Router /api/doujinshi/circles [GET]
func GetCirclesHandler(doujinshiRepository repository.DoujinshiRepository) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		circles, err := usecases.GetCirclesUseCase(doujinshiRepository)
		if err != nil {
			c.String(http.StatusInternalServerError, "%v", err.Error())
			return
		}

		circlesDto := []dto.CircleDto{}

		for _, circle := range circles {
			circlesDto = append(circlesDto, mapping.ToCircleDto(circle))
		}

		sort.Slice(circlesDto, func(i, j int) bool {
			return strings.ToUpper(circlesDto[i].Name) < strings.ToUpper(circlesDto[j].Name)
		})

		c.JSON(http.StatusOK, circlesDto)
	}
	return fn
}
