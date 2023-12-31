package usecases

import (
	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/doujinshi/domain/repository"
	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/helpers"
)

type Character struct {
	Name     string
	Quantity uint16
}

func GetCharactersUseCase(doujinshiRepository repository.DoujinshiRepository) ([]Character, error) {
	allDoujinshi, err := doujinshiRepository.GetAll()
	if err != nil {
		return nil, err
	}

	charactersSlice := []string{}
	charactersMap := map[string]Character{}

	for _, doujinshi := range allDoujinshi {
		charactersSlice = append(charactersSlice, doujinshi.GetCharacterNames()...)
	}

	for _, characterName := range charactersSlice {
		_, exist := charactersMap[characterName]
		if !exist {
			character := Character{}
			character.Name = characterName
			character.Quantity = helpers.CountStringInArray(characterName, charactersSlice)

			charactersMap[characterName] = character
		}
	}

	characters := []Character{}

	for _, character := range charactersMap {
		characters = append(characters, character)
	}

	return characters, nil
}
