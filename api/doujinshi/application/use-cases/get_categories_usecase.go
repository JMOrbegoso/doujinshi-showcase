package usecases

import (
	"github.com/jmorbegoso/doujinshi-showcase/api/doujinshi/domain/repository"
	"github.com/jmorbegoso/doujinshi-showcase/api/helpers"
)

type Category struct {
	Name     string
	Quantity uint16
}

func GetCategoriesUseCase(doujinshiRepository repository.DoujinshiRepository) ([]Category, error) {
	allDoujinshi, err := doujinshiRepository.GetAll()
	if err != nil {
		return nil, err
	}

	categoriesSlice := []string{}
	categoriesMap := map[string]Category{}

	for _, doujinshi := range allDoujinshi {
		categoriesSlice = append(categoriesSlice, doujinshi.GetCategoryName())
	}

	for _, categoryName := range categoriesSlice {
		_, exist := categoriesMap[categoryName]
		if !exist {
			category := Category{}
			category.Name = categoryName
			category.Quantity = helpers.CountStringInArray(categoryName, categoriesSlice)

			categoriesMap[categoryName] = category
		}
	}

	categories := []Category{}

	for _, category := range categoriesMap {
		categories = append(categories, category)
	}

	return categories, nil
}
