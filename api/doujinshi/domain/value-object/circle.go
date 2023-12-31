package valueobject

import "strings"

type Circle struct {
	value string
}

func (v *Circle) GetCircleName() string {
	return v.value
}

func NewCircle(circle string) (Circle, error) {
	newCircle := Circle{}
	newCircle.value = strings.ToLower(circle)
	return newCircle, nil
}
