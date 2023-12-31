package filesystem

import (
	"io/fs"
	"path/filepath"
)

func findMetadataFilePath(librarySubfolderPath string, files []fs.DirEntry) (string, error) {
	// Load metadata from metadata.json file
	for _, file := range files {
		if file.IsDir() {
			continue
		}

		if file.Name() == "metadata.json" && filepath.Ext(file.Name()) == ".json" {
			metadataFile := filepath.Join(librarySubfolderPath, file.Name())
			return metadataFile, nil
		}
	}

	var error MetadataFileNotFoundError
	return "", error
}

type MetadataFileNotFoundError interface {
	Error() string
}
