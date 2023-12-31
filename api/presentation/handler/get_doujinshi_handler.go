package handler

import (
	"net/http"
	"strconv"

	usecases "gitea.jmorbegoso.com/jm/doujinshi-showcase/api/doujinshi/application/use-cases"
	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/doujinshi/domain/repository"
	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/presentation/dto"
	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/presentation/mapping"
	"github.com/gin-gonic/gin"
)

// @Summary Get all doujinshi
// @Description Get all the doujinshi in the library.
// @Tags doujinshi
// @Accept json
// @Param  search       query  string    false  "search text in doujinshi"
// @Param  quantity     query  int       false  "number of doujinshi to select"      minimum(0)
// @Param  random       query  boolean   false  "random sort the list of doujinshi"
// @Param  title        query  []string  false  "filter doujinshi by title"          collectionFormat(multi)
// @Param  artist       query  []string  false  "filter doujinshi by artist"         collectionFormat(multi)
// @Param  circle       query  []string  false  "filter doujinshi by circle"         collectionFormat(multi)
// @Param  category     query  []string  false  "filter doujinshi by category"       collectionFormat(multi)
// @Param  character    query  []string  false  "filter doujinshi by character"      collectionFormat(multi)
// @Param  parody       query  []string  false  "filter doujinshi by parody"         collectionFormat(multi)
// @Param  tag          query  []string  false  "filter doujinshi by tag"            collectionFormat(multi)
// @Produce json
// @Success 200 {array}  dto.DoujinshiDto
// @Success 500 {string} string
// @Router /api/doujinshi [GET]
func GetDoujinshiHandler(doujinshiRepository repository.DoujinshiRepository) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		// Get the filters parameters
		searchFilterQueryParam, searchFilterQueryParamExist := c.GetQuery("search")
		quantityQueryParam, quantityQueryParamExist := c.GetQuery("quantity")
		_, randomSortQueryParamExist := c.GetQuery("random")
		titleFiltersQueryParam, _ := c.GetQueryArray("title")
		artistsFiltersQueryParam, _ := c.GetQueryArray("artist")
		circlesFiltersQueryParam, _ := c.GetQueryArray("circle")
		categoriesFiltersQueryParam, _ := c.GetQueryArray("category")
		charactersFiltersQueryParam, _ := c.GetQueryArray("character")
		parodiesFiltersQueryParam, _ := c.GetQueryArray("parody")
		tagsFiltersQueryParam, _ := c.GetQueryArray("tag")

		var searchFilter string
		if searchFilterQueryParamExist {
			searchFilter = searchFilterQueryParam
		}

		var randomQuantity uint
		if quantityQueryParamExist {
			randomQuantityInt, err := strconv.Atoi(quantityQueryParam)
			if err != nil {
				randomQuantity = 0
			} else {
				randomQuantity = uint(randomQuantityInt)
			}
		}

		applyRandomSort := randomSortQueryParamExist

		doujinshiFound, err := usecases.GetDoujinshiUseCase(doujinshiRepository, searchFilter, randomQuantity, applyRandomSort, titleFiltersQueryParam, artistsFiltersQueryParam, circlesFiltersQueryParam, categoriesFiltersQueryParam, charactersFiltersQueryParam, parodiesFiltersQueryParam, tagsFiltersQueryParam)
		if err != nil {
			c.String(http.StatusInternalServerError, "%v", err.Error())
			return
		}

		doujinshiDtos := []dto.DoujinshiDto{}

		for _, d := range doujinshiFound {
			dto := mapping.DoujinshiToDto(d)
			doujinshiDtos = append(doujinshiDtos, dto)
		}

		c.JSON(http.StatusOK, doujinshiDtos)
	}
	return fn
}
