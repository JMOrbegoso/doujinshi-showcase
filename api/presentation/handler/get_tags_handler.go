package handler

import (
	"net/http"
	"sort"
	"strings"

	"github.com/gin-gonic/gin"
	usecases "github.com/jmorbegoso/doujinshi-showcase/api/doujinshi/application/use-cases"
	"github.com/jmorbegoso/doujinshi-showcase/api/doujinshi/domain/repository"
	"github.com/jmorbegoso/doujinshi-showcase/api/presentation/dto"
	mapping "github.com/jmorbegoso/doujinshi-showcase/api/presentation/mapping"
)

// @Summary Get tags
// @Description Get all the tags from the doujinshi library.
// @Tags tags
// @Produce json
// @Success 200 {array}  dto.TagDto
// @Success 500 {string} string
// @Router /api/doujinshi/tags [GET]
func GetTagsHandler(doujinshiRepository repository.DoujinshiRepository) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		tags, err := usecases.GetTagsUseCase(doujinshiRepository)
		if err != nil {
			c.String(http.StatusInternalServerError, "%v", err.Error())
			return
		}

		tagsDto := []dto.TagDto{}

		for _, tag := range tags {
			tagsDto = append(tagsDto, mapping.ToTagDto(tag))
		}

		sort.Slice(tagsDto, func(i, j int) bool {
			return strings.ToUpper(tagsDto[i].Name) < strings.ToUpper(tagsDto[j].Name)
		})

		c.JSON(http.StatusOK, tagsDto)
	}
	return fn
}
