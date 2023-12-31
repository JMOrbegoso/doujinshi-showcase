package mapping

import (
	usecases "gitea.jmorbegoso.com/jm/doujinshi-showcase/api/doujinshi/application/use-cases"
	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/presentation/dto"
)

func ToParodyDto(p usecases.Parody) dto.ParodyDto {
	dto := dto.ParodyDto{}

	dto.Name = p.Name
	dto.Quantity = p.Quantity

	return dto
}
