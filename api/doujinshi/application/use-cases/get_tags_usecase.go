package usecases

import (
	"github.com/jmorbegoso/doujinshi-showcase/api/doujinshi/domain/repository"
	"github.com/jmorbegoso/doujinshi-showcase/api/helpers"
)

type Tag struct {
	Name     string
	Quantity uint16
}

func GetTagsUseCase(doujinshiRepository repository.DoujinshiRepository) ([]Tag, error) {
	allDoujinshi, err := doujinshiRepository.GetAll()
	if err != nil {
		return nil, err
	}

	tagsSlice := []string{}
	tagsMap := map[string]Tag{}

	for _, doujinshi := range allDoujinshi {
		tagsSlice = append(tagsSlice, doujinshi.GetTagNames()...)
	}

	for _, tagName := range tagsSlice {
		_, exist := tagsMap[tagName]
		if !exist {
			tag := Tag{}
			tag.Name = tagName
			tag.Quantity = helpers.CountStringInArray(tagName, tagsSlice)

			tagsMap[tagName] = tag
		}
	}

	tags := []Tag{}

	for _, tag := range tagsMap {
		tags = append(tags, tag)
	}

	return tags, nil
}
