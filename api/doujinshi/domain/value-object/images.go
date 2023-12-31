package valueobject

import "io/fs"

type Images struct {
	imagesFsEntries []fs.DirEntry
	cover           string
}

func (v *Images) GetImages() []fs.DirEntry {
	return v.imagesFsEntries
}

func (v *Images) GetCover() string {
	return v.cover
}

type InvalidCoverIndexError interface {
	Error() string
}

func NewImages(images []fs.DirEntry, cover string) (Images, error) {
	newImage := Images{}

	newImage.imagesFsEntries = images

	if cover != "" {
		newImage.cover = cover
	} else if len(images) > 0 {
		newImage.cover = images[0].Name()
	} else {
		newImage.cover = ""
	}

	return newImage, nil
}
