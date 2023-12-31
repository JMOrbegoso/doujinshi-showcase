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

// @Summary Get categories
// @Description Get all the categories from the doujinshi library.
// @Tags categories
// @Produce json
// @Success 200 {array}  dto.CategoryDto
// @Success 500 {string} string
// @Router /api/doujinshi/categories [GET]
func GetCategoriesHandler(doujinshiRepository repository.DoujinshiRepository) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		categories, err := usecases.GetCategoriesUseCase(doujinshiRepository)
		if err != nil {
			c.String(http.StatusInternalServerError, "%v", err.Error())
			return
		}

		categoriesDto := []dto.CategoryDto{}

		for _, category := range categories {
			categoriesDto = append(categoriesDto, mapping.ToCategoryDto(category))
		}

		sort.Slice(categoriesDto, func(i, j int) bool {
			return strings.ToUpper(categoriesDto[i].Name) < strings.ToUpper(categoriesDto[j].Name)
		})

		c.JSON(http.StatusOK, categoriesDto)
	}
	return fn
}
