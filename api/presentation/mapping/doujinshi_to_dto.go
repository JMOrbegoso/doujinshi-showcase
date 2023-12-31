package mapping

import (
	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/doujinshi/domain/aggregate"
	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/presentation/dto"
)

func DoujinshiToDto(d aggregate.Doujinshi) dto.DoujinshiDto {
	dto := dto.DoujinshiDto{}

	dto.Id = d.GetId()
	dto.LibraryName = d.GetLibraryName()
	dto.Title = d.GetTitle()
	dto.Artists = d.GetArtistsNames()
	dto.Circles = d.GetCirclesNames()
	dto.Pages = d.GetPagesQuantity()
	dto.Category = d.GetCategoryName()
	dto.Characters = d.GetCharacterNames()
	dto.Parodies = d.GetParodyNames()
	dto.Url = d.GetUrl()
	dto.Tags = d.GetTagNames()
	dto.Cover = d.GetCover()
	dto.Images = d.GetImageUrls()

	return dto
}
