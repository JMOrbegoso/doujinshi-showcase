package mapping

import (
	usecases "gitea.jmorbegoso.com/jm/doujinshi-showcase/api/doujinshi/application/use-cases"
	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/presentation/dto"
)

func ToCharactersDto(c usecases.Character) dto.CharacterDto {
	dto := dto.CharacterDto{}

	dto.Name = c.Name
	dto.Quantity = c.Quantity

	return dto
}
