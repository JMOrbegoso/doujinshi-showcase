package filesystem

import (
	"io/fs"
	"path/filepath"

	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/doujinshi/domain/aggregate"
	valueobject "gitea.jmorbegoso.com/jm/doujinshi-showcase/api/doujinshi/domain/value-object"
	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/doujinshi/infrastructure/filesystem/models"
)

func createDoujinshiFromMetadata(metadata *models.DoujinshiMetadata, librarySubfolder fs.DirEntry, files []fs.DirEntry) (*aggregate.Doujinshi, error) {
	title, err := valueobject.NewTitle(metadata.Title)
	if err != nil {
		return nil, err
	}

	// Convert data from metadata file
	libraryName, err := valueobject.NewLibraryName(librarySubfolder.Name())
	if err != nil {
		return nil, err
	}

	artists := []valueobject.Artist{}
	for _, artist := range metadata.Artists {
		artistName, err := valueobject.NewArtist(artist)
		if err != nil {
			return nil, err
		}

		artists = append(artists, artistName)
	}

	circles := []valueobject.Circle{}
	for _, circle := range metadata.Circles {
		circleName, err := valueobject.NewCircle(circle)
		if err != nil {
			return nil, err
		}
		circles = append(circles, circleName)
	}

	category, err := valueobject.NewCategory(metadata.Category)
	if err != nil {
		return nil, err
	}

	characters := []valueobject.Character{}
	for _, character := range metadata.Characters {
		c, err := valueobject.NewCharacter(character)
		if err != nil {
			return nil, err
		}
		characters = append(characters, c)
	}

	parodies := []valueobject.Parody{}
	for _, parody := range metadata.Parodies {
		p, err := valueobject.NewParody(parody)
		if err != nil {
			return nil, err
		}
		parodies = append(parodies, p)
	}

	url, err := valueobject.NewUrl(metadata.Url)
	if err != nil {
		return nil, err
	}

	tags := []valueobject.Tag{}
	for _, tag := range metadata.Tags {
		t, err := valueobject.NewTag(tag)
		if err != nil {
			return nil, err
		}
		tags = append(tags, t)
	}

	doujinshi := aggregate.NewDoujinshi()
	doujinshi.BuildDoujinshi(libraryName, title, artists, circles, category, characters, parodies, url, tags)

	// Load doujinshi images
	imagesFsEntries := []fs.DirEntry{}
	for _, file := range files {
		if file.IsDir() {
			continue
		}

		if !FileIsImage(filepath.Ext(file.Name())) {
			continue
		}

		imagesFsEntries = append(imagesFsEntries, file)
	}

	pagesQuantity, err := valueobject.NewPages(uint16(len(imagesFsEntries)))
	if err != nil {
		return nil, err
	}

	images, err := valueobject.NewImages(imagesFsEntries, metadata.Cover)
	if err != nil {
		return nil, err
	}

	doujinshi.SetPagesQuantity(pagesQuantity)
	doujinshi.SetImages(images)

	return &doujinshi, nil
}
