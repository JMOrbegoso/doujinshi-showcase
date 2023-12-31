package usecases

import (
	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/doujinshi/domain/aggregate"
	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/doujinshi/domain/repository"
)

func GetDoujinshibyIdUseCase(doujinshiRepository repository.DoujinshiRepository, id string) (*aggregate.Doujinshi, error) {
	doujinshi, err := doujinshiRepository.GetById(id)
	if err != nil {
		return nil, err
	}
	return doujinshi, nil
}
