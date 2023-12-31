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

// @Summary Get parodies
// @Description Get all the parodies from the doujinshi library.
// @Tags parodies
// @Produce json
// @Success 200 {array}  dto.ParodyDto
// @Success 500 {string} string
// @Router /api/doujinshi/parodies [GET]
func GetParodiesHandler(doujinshiRepository repository.DoujinshiRepository) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		parodies, err := usecases.GetParodiesUseCase(doujinshiRepository)
		if err != nil {
			c.String(http.StatusInternalServerError, "%v", err.Error())
			return
		}

		parodiesDto := []dto.ParodyDto{}

		for _, parody := range parodies {
			parodiesDto = append(parodiesDto, mapping.ToParodyDto(parody))
		}

		sort.Slice(parodiesDto, func(i, j int) bool {
			return strings.ToUpper(parodiesDto[i].Name) < strings.ToUpper(parodiesDto[j].Name)
		})

		c.JSON(http.StatusOK, parodiesDto)
	}
	return fn
}
