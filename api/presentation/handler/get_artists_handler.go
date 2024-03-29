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

// @Summary Get artists
// @Description Get all the artists from the doujinshi library.
// @Tags artists
// @Produce json
// @Success 200 {array}  dto.ArtistDto
// @Success 500 {string} string
// @Router /api/doujinshi/artists [GET]
func GetArtistsHandler(doujinshiRepository repository.DoujinshiRepository) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		artists, err := usecases.GetArtistsUseCase(doujinshiRepository)
		if err != nil {
			c.String(http.StatusInternalServerError, "%v", err.Error())
			return
		}

		artistsDto := []dto.ArtistDto{}

		for _, artist := range artists {
			artistsDto = append(artistsDto, mapping.ToArtistDto(artist))
		}

		sort.Slice(artistsDto, func(i, j int) bool {
			return strings.ToUpper(artistsDto[i].Name) < strings.ToUpper(artistsDto[j].Name)
		})

		c.JSON(http.StatusOK, artistsDto)
	}
	return fn
}
