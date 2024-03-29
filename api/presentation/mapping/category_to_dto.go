package mapping

import (
	usecases "github.com/jmorbegoso/doujinshi-showcase/api/doujinshi/application/use-cases"
	"github.com/jmorbegoso/doujinshi-showcase/api/presentation/dto"
)

func ToCategoryDto(p usecases.Category) dto.CategoryDto {
	dto := dto.CategoryDto{}

	dto.Name = p.Name
	dto.Quantity = p.Quantity

	return dto
}
