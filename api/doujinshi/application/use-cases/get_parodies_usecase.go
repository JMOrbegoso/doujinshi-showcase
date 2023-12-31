package usecases

import (
	"github.com/jmorbegoso/doujinshi-showcase/api/doujinshi/domain/repository"
	"github.com/jmorbegoso/doujinshi-showcase/api/helpers"
)

type Parody struct {
	Name     string
	Quantity uint16
}

func GetParodiesUseCase(doujinshiRepository repository.DoujinshiRepository) ([]Parody, error) {
	allDoujinshi, err := doujinshiRepository.GetAll()
	if err != nil {
		return nil, err
	}

	parodiesSlice := []string{}
	parodiesMap := map[string]Parody{}

	for _, doujinshi := range allDoujinshi {
		parodiesSlice = append(parodiesSlice, doujinshi.GetParodyNames()...)
	}

	for _, parodyName := range parodiesSlice {
		_, exist := parodiesMap[parodyName]
		if !exist {
			parody := Parody{}
			parody.Name = parodyName
			parody.Quantity = helpers.CountStringInArray(parodyName, parodiesSlice)

			parodiesMap[parodyName] = parody
		}
	}

	parodies := []Parody{}

	for _, parody := range parodiesMap {
		parodies = append(parodies, parody)
	}

	return parodies, nil
}
