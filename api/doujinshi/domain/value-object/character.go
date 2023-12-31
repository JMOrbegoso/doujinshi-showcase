package valueobject

import "strings"

type Character struct {
	value string
}

func (v *Character) GetCharacterName() string {
	return v.value
}

func NewCharacter(character string) (Character, error) {
	newCharacter := Character{}
	newCharacter.value = strings.ToLower(character)
	return newCharacter, nil
}
