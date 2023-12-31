package valueobject

import "github.com/google/uuid"

type Id struct {
	value string
}

func (v *Id) GetId() string {
	return v.value
}

func NewId() Id {
	newId := Id{}
	newId.value = uuid.New().String()
	return newId
}
