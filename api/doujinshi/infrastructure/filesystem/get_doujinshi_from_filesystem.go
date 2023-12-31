package filesystem

import (
	"log"
	"os"
	"path/filepath"

	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/doujinshi/domain/aggregate"
)

func GetDoujinshiFromFilesystem() ([]*aggregate.Doujinshi, error) {
	doujinshi := []*aggregate.Doujinshi{}

	libraryDir := os.Getenv("LIBRARY_DIR")

	// Get all items in library folder
	libraryItems, err := os.ReadDir(libraryDir)
	if err != nil {
		return nil, err
	}

	// Iterate all items in library folder
	for _, libraryItem := range libraryItems {
		if !libraryItem.IsDir() {
			// Library item is not a directory
			continue
		}

		// Get the path for the folder of that doujinshi
		libraryItemPath := filepath.Join(libraryDir, libraryItem.Name())

		// Iterate all the files inside the library subfolder
		files, err := os.ReadDir(libraryItemPath)
		if err != nil {
			return nil, err
		}

		// Find metadata file
		metadataFile, err := findMetadataFilePath(libraryItemPath, files)
		if err != nil {
			log.Println("Not found metadata file for the path:", libraryItemPath)
			continue
		}

		// Load metadata from metadata file
		metadata, err := readDoujinshiMetadataFile(metadataFile)
		if err != nil {
			log.Println("Invalid metadata file for the path:", libraryItemPath)
			continue
		}

		createdDoujinshi, err := createDoujinshiFromMetadata(metadata, libraryItem, files)
		if err != nil {
			log.Println("Invalid metadata file for the path:", libraryItemPath)
			continue
		}

		doujinshi = append(doujinshi, createdDoujinshi)
	}

	return doujinshi, nil
}
