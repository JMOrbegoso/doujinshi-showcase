package valueobject

type LibraryName struct {
	value string
}

func (v *LibraryName) GetLibraryName() string {
	return v.value
}

func NewLibraryName(libraryName string) (LibraryName, error) {
	newLibraryName := LibraryName{}
	newLibraryName.value = libraryName
	return newLibraryName, nil
}
