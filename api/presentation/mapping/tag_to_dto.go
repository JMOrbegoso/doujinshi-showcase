package mapping

import (
	usecases "gitea.jmorbegoso.com/jm/doujinshi-showcase/api/doujinshi/application/use-cases"
	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/presentation/dto"
)

func ToTagDto(t usecases.Tag) dto.TagDto {
	dto := dto.TagDto{}

	dto.Name = t.Name
	dto.Quantity = t.Quantity

	return dto
}
