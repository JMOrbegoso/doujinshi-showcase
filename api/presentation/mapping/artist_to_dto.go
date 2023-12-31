package mapping

import (
	usecases "github.com/jmorbegoso/doujinshi-showcase/api/doujinshi/application/use-cases"
	"github.com/jmorbegoso/doujinshi-showcase/api/presentation/dto"
)

func ToArtistDto(a usecases.Artist) dto.ArtistDto {
	dto := dto.ArtistDto{}

	dto.Name = a.Name
	dto.Quantity = a.Quantity

	return dto
}
