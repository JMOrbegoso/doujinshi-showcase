package valueobject

type Url struct {
	value string
}

func (v *Url) GetUrl() string {
	return v.value
}

func NewUrl(url string) (Url, error) {
	newUrl := Url{}
	newUrl.value = url
	return newUrl, nil
}
