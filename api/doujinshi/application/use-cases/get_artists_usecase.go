package usecases

import (
	"github.com/jmorbegoso/doujinshi-showcase/api/doujinshi/domain/repository"
	"github.com/jmorbegoso/doujinshi-showcase/api/helpers"
)

type Artist struct {
	Name     string
	Quantity uint16
}

func GetArtistsUseCase(doujinshiRepository repository.DoujinshiRepository) ([]Artist, error) {
	allDoujinshi, err := doujinshiRepository.GetAll()
	if err != nil {
		return nil, err
	}

	artistsSlice := []string{}
	artistsMap := map[string]Artist{}

	for _, doujinshi := range allDoujinshi {
		artistsSlice = append(artistsSlice, doujinshi.GetArtistsNames()...)
	}

	for _, artistName := range artistsSlice {
		_, exist := artistsMap[artistName]
		if !exist {
			artist := Artist{}
			artist.Name = artistName
			artist.Quantity = helpers.CountStringInArray(artistName, artistsSlice)

			artistsMap[artistName] = artist
		}
	}

	artists := []Artist{}

	for _, artist := range artistsMap {
		artists = append(artists, artist)
	}

	return artists, nil
}
