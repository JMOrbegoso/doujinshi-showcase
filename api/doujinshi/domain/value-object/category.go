package valueobject

import "strings"

type Category struct {
	value string
}

func (v *Category) GetCategoryName() string {
	return v.value
}

func NewCategory(category string) (Category, error) {
	newCategory := Category{}
	newCategory.value = strings.ToLower(category)
	return newCategory, nil
}
