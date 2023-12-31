package usecases

import (
	"sort"
	"strings"

	"github.com/jmorbegoso/doujinshi-showcase/api/doujinshi/domain/repository"
)

func GetUrlsUseCase(doujinshiRepository repository.DoujinshiRepository) ([]string, error) {
	allDoujinshi, err := doujinshiRepository.GetAll()
	if err != nil {
		return nil, err
	}

	urlsArray := []string{}

	for _, doujinshi := range allDoujinshi {
		urlsArray = append(urlsArray, doujinshi.GetUrl())
	}

	sort.Slice(urlsArray, func(i, j int) bool {
		return strings.ToUpper(urlsArray[i]) < strings.ToUpper(urlsArray[j])
	})

	return urlsArray, nil
}
