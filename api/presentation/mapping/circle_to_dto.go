package mapping

import (
	usecases "github.com/jmorbegoso/doujinshi-showcase/api/doujinshi/application/use-cases"
	"github.com/jmorbegoso/doujinshi-showcase/api/presentation/dto"
)

func ToCircleDto(c usecases.Circle) dto.CircleDto {
	dto := dto.CircleDto{}

	dto.Name = c.Name
	dto.Quantity = c.Quantity

	return dto
}
