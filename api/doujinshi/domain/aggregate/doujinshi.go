package aggregate

import (
	"os"

	valueobject "github.com/jmorbegoso/doujinshi-showcase/api/doujinshi/domain/value-object"
)

type Doujinshi struct {
	id          valueobject.Id
	libraryName valueobject.LibraryName
	title       valueobject.Title
	artists     []valueobject.Artist
	circles     []valueobject.Circle
	pages       valueobject.PagesQuantity
	category    valueobject.Category
	characters  []valueobject.Character
	parodies    []valueobject.Parody
	url         valueobject.Url
	tags        []valueobject.Tag
	images      valueobject.Images
}

func (m *Doujinshi) GetId() string {
	return m.id.GetId()
}

func (m *Doujinshi) GetLibraryName() string {
	return m.libraryName.GetLibraryName()
}

func (m *Doujinshi) GetTitle() string {
	return m.title.GetTitle()
}

func (m *Doujinshi) GetArtistsNames() []string {
	artists := []string{}

	for _, a := range m.artists {
		artists = append(artists, a.GetArtistName())
	}

	return artists
}

func (m *Doujinshi) GetCirclesNames() []string {
	circles := []string{}

	for _, g := range m.circles {
		circles = append(circles, g.GetCircleName())
	}

	return circles
}

func (m *Doujinshi) GetPagesQuantity() uint16 {
	return m.pages.GetQuantity()
}

func (m *Doujinshi) GetCategoryName() string {
	return m.category.GetCategoryName()
}

func (m *Doujinshi) GetCharacterNames() []string {
	characters := []string{}

	for _, c := range m.characters {
		characters = append(characters, c.GetCharacterName())
	}

	return characters
}

func (m *Doujinshi) GetParodyNames() []string {
	parodies := []string{}

	for _, p := range m.parodies {
		parodies = append(parodies, p.GetParodyName())
	}

	return parodies
}

func (m *Doujinshi) GetUrl() string {
	return m.url.GetUrl()
}

func (m *Doujinshi) GetTagNames() []string {
	tags := []string{}

	for _, t := range m.tags {
		tags = append(tags, t.GetTagName())
	}

	return tags
}

func (m *Doujinshi) GetImages() []string {
	imagesFileNames := []string{}

	for _, img := range m.images.GetImages() {
		imagesFileNames = append(imagesFileNames, img.Name())
	}

	return imagesFileNames
}

func (m *Doujinshi) GetImageUrls() []string {
	imagesFileNames := []string{}

	serverUrl := os.Getenv("SERVER_URL")

	for _, img := range m.images.GetImages() {
		imagesFileNames = append(imagesFileNames, serverUrl+"/images/"+m.GetLibraryName()+"/"+img.Name())
	}

	return imagesFileNames
}

func (m *Doujinshi) GetCover() string {
	serverUrl := os.Getenv("SERVER_URL")
	return serverUrl + "/images/" + m.GetLibraryName() + "/" + m.images.GetCover()
}

func NewDoujinshi() Doujinshi {
	newDoujinshi := Doujinshi{}
	newDoujinshi.id = valueobject.NewId()
	return newDoujinshi
}

func (m *Doujinshi) BuildDoujinshi(libraryName valueobject.LibraryName, title valueobject.Title, artists []valueobject.Artist, circles []valueobject.Circle, category valueobject.Category, characters []valueobject.Character, parody []valueobject.Parody, url valueobject.Url, tags []valueobject.Tag) {
	m.libraryName = libraryName
	m.title = title
	m.artists = artists
	m.circles = circles
	m.category = category
	m.characters = characters
	m.parodies = parody
	m.url = url
	m.tags = tags
}

func (m *Doujinshi) SetPagesQuantity(pagesQuantity valueobject.PagesQuantity) {
	m.pages = pagesQuantity
}

func (m *Doujinshi) SetImages(images valueobject.Images) {
	m.images = images
}
