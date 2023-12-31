package filesystem

import (
	"encoding/json"
	"os"

	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/doujinshi/infrastructure/filesystem/models"
)

func readDoujinshiMetadataFile(filename string) (*models.DoujinshiMetadata, error) {
	// Read the file content as bytes
	bytes, err := os.ReadFile(filename)
	if err != nil {
		return nil, err
	}

	// Create a Data instance to hold the deserialized data
	var data models.DoujinshiMetadata

	// Unmarshal the bytes into the Data instance
	err = json.Unmarshal(bytes, &data)
	if err != nil {
		return nil, err
	}

	// Return the Data instance and nil error
	return &data, nil
}
