package mapping

import (
	usecases "gitea.jmorbegoso.com/jm/doujinshi-showcase/api/doujinshi/application/use-cases"
	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/presentation/dto"
)

func ToCircleDto(c usecases.Circle) dto.CircleDto {
	dto := dto.CircleDto{}

	dto.Name = c.Name
	dto.Quantity = c.Quantity

	return dto
}
