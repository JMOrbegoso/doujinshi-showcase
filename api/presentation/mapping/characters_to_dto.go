package mapping

import (
	usecases "github.com/jmorbegoso/doujinshi-showcase/api/doujinshi/application/use-cases"
	"github.com/jmorbegoso/doujinshi-showcase/api/presentation/dto"
)

func ToCharactersDto(c usecases.Character) dto.CharacterDto {
	dto := dto.CharacterDto{}

	dto.Name = c.Name
	dto.Quantity = c.Quantity

	return dto
}
