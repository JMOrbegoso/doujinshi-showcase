package usecases

import (
	"github.com/jmorbegoso/doujinshi-showcase/api/doujinshi/domain/repository"
	"github.com/jmorbegoso/doujinshi-showcase/api/doujinshi/infrastructure/filesystem"
)

func RefreshLibraryUseCase(doujinshiRepository repository.DoujinshiRepository) error {
	// Empty the doujinshi repository
	if err := doujinshiRepository.DeleteAll(); err != nil {
		return err
	}

	// Load doujinshi from filesystem
	doujinshiFromFilesystem, err := filesystem.GetDoujinshiFromFilesystem()
	if err != nil {
		return err
	}

	if err := doujinshiRepository.AddMany(doujinshiFromFilesystem); err != nil {
		return err
	}

	return nil
}
