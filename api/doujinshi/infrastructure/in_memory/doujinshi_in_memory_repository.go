package in_memory

import (
	"strings"

	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/doujinshi/domain/aggregate"
)

type DoujinshiInMemoryRepository struct {
	doujinshiSlice []*aggregate.Doujinshi
}

func NewDoujinshiInMemoryRepository(doujinshi []*aggregate.Doujinshi) *DoujinshiInMemoryRepository {
	return &DoujinshiInMemoryRepository{
		doujinshiSlice: doujinshi,
	}
}

func (doujinshiRepository *DoujinshiInMemoryRepository) GetById(id string) (*aggregate.Doujinshi, error) {
	for _, doujinshi := range doujinshiRepository.doujinshiSlice {
		if strings.EqualFold(doujinshi.GetId(), id) {
			return doujinshi, nil
		}
	}
	return nil, nil
}

func (doujinshiRepository *DoujinshiInMemoryRepository) GetAll() ([]*aggregate.Doujinshi, error) {
	return doujinshiRepository.doujinshiSlice, nil
}

func (doujinshiRepository *DoujinshiInMemoryRepository) AddMany(doujinshi []*aggregate.Doujinshi) error {
	doujinshiRepository.doujinshiSlice = append(doujinshiRepository.doujinshiSlice, doujinshi...)
	return nil
}

func (doujinshiRepository *DoujinshiInMemoryRepository) Add(doujinshi *aggregate.Doujinshi) error {
	doujinshiRepository.doujinshiSlice = append(doujinshiRepository.doujinshiSlice, doujinshi)
	return nil
}

func (doujinshiRepository *DoujinshiInMemoryRepository) DeleteAll() error {
	doujinshiRepository.doujinshiSlice = (doujinshiRepository.doujinshiSlice)[:0]
	return nil
}
