package valueobject

import "strings"

type Artist struct {
	value string
}

func (v *Artist) GetArtistName() string {
	return v.value
}

func NewArtist(artist string) (Artist, error) {
	newArtist := Artist{}
	newArtist.value = strings.ToLower(artist)
	return newArtist, nil
}
