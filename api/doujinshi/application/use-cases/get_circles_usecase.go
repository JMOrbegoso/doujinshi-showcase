package usecases

import (
	"github.com/jmorbegoso/doujinshi-showcase/api/doujinshi/domain/repository"
	"github.com/jmorbegoso/doujinshi-showcase/api/helpers"
)

type Circle struct {
	Name     string
	Quantity uint16
}

func GetCirclesUseCase(doujinshiRepository repository.DoujinshiRepository) ([]Circle, error) {
	allDoujinshi, err := doujinshiRepository.GetAll()
	if err != nil {
		return nil, err
	}

	circlesSlice := []string{}
	circlesMap := map[string]Circle{}

	for _, doujinshi := range allDoujinshi {
		circlesSlice = append(circlesSlice, doujinshi.GetCirclesNames()...)
	}

	for _, circleName := range circlesSlice {
		_, exist := circlesMap[circleName]
		if !exist {
			circle := Circle{}
			circle.Name = circleName
			circle.Quantity = helpers.CountStringInArray(circleName, circlesSlice)

			circlesMap[circleName] = circle
		}
	}

	circles := []Circle{}

	for _, circle := range circlesMap {
		circles = append(circles, circle)
	}

	return circles, nil
}
