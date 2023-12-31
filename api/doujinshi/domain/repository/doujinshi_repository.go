package repository

import "github.com/jmorbegoso/doujinshi-showcase/api/doujinshi/domain/aggregate"

type DoujinshiRepository interface {
	GetById(string) (*aggregate.Doujinshi, error)

	GetAll() ([]*aggregate.Doujinshi, error)

	AddMany(doujinshi []*aggregate.Doujinshi) error

	Add(doujinshi *aggregate.Doujinshi) error

	DeleteAll() error
}
