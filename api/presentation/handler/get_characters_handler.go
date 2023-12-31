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

// @Summary Get characters
// @Description Get all the characters from the doujinshi library.
// @Tags characters
// @Produce json
// @Success 200 {array}  dto.CharacterDto
// @Success 500 {string} string
// @Router /api/doujinshi/characters [GET]
func GetCharactersHandler(doujinshiRepository repository.DoujinshiRepository) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		characters, err := usecases.GetCharactersUseCase(doujinshiRepository)
		if err != nil {
			c.String(http.StatusInternalServerError, "%v", err.Error())
			return
		}

		charactersDto := []dto.CharacterDto{}

		for _, character := range characters {
			charactersDto = append(charactersDto, mapping.ToCharactersDto(character))
		}

		sort.Slice(charactersDto, func(i, j int) bool {
			return strings.ToUpper(charactersDto[i].Name) < strings.ToUpper(charactersDto[j].Name)
		})

		c.JSON(http.StatusOK, charactersDto)
	}
	return fn
}
