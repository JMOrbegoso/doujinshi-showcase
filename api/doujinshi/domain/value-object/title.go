package valueobject

type Title struct {
	value string
}

func (v *Title) GetTitle() string {
	return v.value
}

func NewTitle(title string) (Title, error) {
	newTitle := Title{}
	newTitle.value = title
	return newTitle, nil
}
