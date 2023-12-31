package valueobject

import "strings"

type Tag struct {
	value string
}

func (v *Tag) GetTagName() string {
	return v.value
}

func NewTag(tag string) (Tag, error) {
	newTag := Tag{}
	newTag.value = strings.ToLower(tag)
	return newTag, nil
}
