package valueobject

import "strings"

type Parody struct {
	value string
}

func (v *Parody) GetParodyName() string {
	return v.value
}

func NewParody(parody string) (Parody, error) {
	newParody := Parody{}
	newParody.value = strings.ToLower(parody)
	return newParody, nil
}
