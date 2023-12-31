package dto

// @Description Doujinshi dto
type DoujinshiDto struct {
	// Id of the doujinshi
	Id string

	// LibraryName of the doujinshi
	LibraryName string

	// Title of the doujinshi
	Title string

	// Artists of the doujinshi
	Artists []string

	// Circles of the doujinshi
	Circles []string

	// Pages quantity of the doujinshi
	Pages uint16

	// Category of the doujinshi
	Category string

	// Characters of the doujinshi
	Characters []string

	// Parodies of the doujinshi
	Parodies []string

	// Url of the doujinshi
	Url string

	// Tags of the doujinshi
	Tags []string

	// Cover image of the doujinshi
	Cover string

	// Images of the doujinshi
	Images []string
}
