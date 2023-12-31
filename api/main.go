package main

import (
	"github.com/jmorbegoso/doujinshi-showcase/api/doujinshi/domain/aggregate"
	"github.com/jmorbegoso/doujinshi-showcase/api/doujinshi/infrastructure/filesystem"
	"github.com/jmorbegoso/doujinshi-showcase/api/doujinshi/infrastructure/in_memory"
	api "github.com/jmorbegoso/doujinshi-showcase/api/presentation"
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
