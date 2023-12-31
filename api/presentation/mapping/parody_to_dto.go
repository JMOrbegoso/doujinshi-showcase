package mapping

import (
	usecases "github.com/jmorbegoso/doujinshi-showcase/api/doujinshi/application/use-cases"
	"github.com/jmorbegoso/doujinshi-showcase/api/presentation/dto"
)

func ToParodyDto(p usecases.Parody) dto.ParodyDto {
	dto := dto.ParodyDto{}

	dto.Name = p.Name
	dto.Quantity = p.Quantity

	return dto
}
