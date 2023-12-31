package models

type DoujinshiMetadata struct {
	Title      string   `json:"title"`
	Artists    []string `json:"artists"`
	Circles    []string `json:"circles"`
	Cover      string   `json:"cover"`
	Category   string   `json:"category"`
	Tags       []string `json:"tags"`
	Parodies   []string `json:"parodies"`
	Characters []string `json:"characters"`
	Url        string   `json:"url"`
}
