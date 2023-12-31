package mapping

import (
	usecases "github.com/jmorbegoso/doujinshi-showcase/api/doujinshi/application/use-cases"
	"github.com/jmorbegoso/doujinshi-showcase/api/presentation/dto"
)

func ToTagDto(t usecases.Tag) dto.TagDto {
	dto := dto.TagDto{}

	dto.Name = t.Name
	dto.Quantity = t.Quantity

	return dto
}
