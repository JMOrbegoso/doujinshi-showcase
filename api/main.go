package main

import (
	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/doujinshi/domain/aggregate"
	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/doujinshi/infrastructure/filesystem"
	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/doujinshi/infrastructure/in_memory"
	api "gitea.jmorbegoso.com/jm/doujinshi-showcase/api/presentation"
)

func main() {
	doujinshiSlice := []*aggregate.Doujinshi{}
	doujinshiRepository := in_memory.NewDoujinshiInMemoryRepository(doujinshiSlice)

	// Load doujinshi from filesystem
	doujinshiFromFilesystem, err := filesystem.GetDoujinshiFromFilesystem()
	if err != nil {
		panic(err)
	}

	doujinshiRepository.AddMany(doujinshiFromFilesystem)

	// Create api
	ginEngine, err := api.CreateApi(doujinshiRepository)
	if err != nil {
		panic(err)
	}

	// Start gin api
	ginEngine.Run()
}
