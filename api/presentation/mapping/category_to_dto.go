package mapping

import (
	usecases "gitea.jmorbegoso.com/jm/doujinshi-showcase/api/doujinshi/application/use-cases"
	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/presentation/dto"
)

func ToCategoryDto(p usecases.Category) dto.CategoryDto {
	dto := dto.CategoryDto{}

	dto.Name = p.Name
	dto.Quantity = p.Quantity

	return dto
}
