package handler

import (
	"math"
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
// @Param  page_number  query  int       false  "number of the page"                 minimum(0)
// @Param  page_size    query  int       false  "number of doujinshi by page"        minimum(0)
// @Param  search       query  string    false  "search text in doujinshi"
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
func GetDoujinshiPaginatedHandler(doujinshiRepository repository.DoujinshiRepository) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		// Get the pagination parameters
		pageNumberQueryParam, pageNumberQueryParamExist := c.GetQuery("page_number")
		pageSizeQueryParam, pageSizeQueryParamExist := c.GetQuery("page_size")

		if !pageNumberQueryParamExist || !pageSizeQueryParamExist {
			c.String(http.StatusBadRequest, "%v", "Invalid pagination parameters.")
			return
		}

		pageNumber, err := strconv.Atoi(pageNumberQueryParam)
		if err != nil {
			c.String(http.StatusBadRequest, "%v", "Invalid pagination parameters.")
			return
		}

		pageSize, err := strconv.Atoi(pageSizeQueryParam)
		if err != nil {
			c.String(http.StatusBadRequest, "%v", "Invalid pagination parameters.")
			return
		}

		// Get the filters parameters
		searchFilterQueryParam, searchFilterQueryParamExist := c.GetQuery("search")
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

		doujinshiFound, err := usecases.GetDoujinshiUseCase(doujinshiRepository, searchFilter, 0, false, titleFiltersQueryParam, artistsFiltersQueryParam, circlesFiltersQueryParam, categoriesFiltersQueryParam, charactersFiltersQueryParam, parodiesFiltersQueryParam, tagsFiltersQueryParam)
		if err != nil {
			c.String(http.StatusInternalServerError, "%v", err.Error())
			return
		}

		doujinshiDtos := []dto.DoujinshiDto{}

		// Pagination
		totalItems := len(doujinshiFound)
		totalPages := int(math.Ceil(float64(totalItems) / float64(pageSize)))

		firstIndex := (pageNumber - 1) * pageSize
		lastIndex := firstIndex + pageSize

		if lastIndex > len(doujinshiFound) {
			lastIndex = len(doujinshiFound)
		}

		paginatedDoujinshi := doujinshiFound[firstIndex:lastIndex]

		for _, d := range paginatedDoujinshi {
			dto := mapping.DoujinshiToDto(d)
			doujinshiDtos = append(doujinshiDtos, dto)
		}

		paginatedDoujinshiDto := dto.NewPaginatedDoujinshiDto(totalItems, totalPages, pageNumber, pageSize, doujinshiDtos)

		c.JSON(http.StatusOK, paginatedDoujinshiDto)
	}
	return fn
}
