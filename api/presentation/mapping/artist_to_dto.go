package mapping

import (
	usecases "gitea.jmorbegoso.com/jm/doujinshi-showcase/api/doujinshi/application/use-cases"
	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/presentation/dto"
)

func ToArtistDto(a usecases.Artist) dto.ArtistDto {
	dto := dto.ArtistDto{}

	dto.Name = a.Name
	dto.Quantity = a.Quantity

	return dto
}
