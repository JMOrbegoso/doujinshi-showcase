package dto

// @Description Paginated response
type PaginatedDoujinshiDto struct {
	// The total number of items available in the dataset
	TotalItems int

	// The total number of pages available in the dataset.
	TotalPages int

	// The current page number being returned
	PageNumber int

	// The number of items being returned per page
	PageSize int

	// The items being returned in this page
	Items []DoujinshiDto
}

func NewPaginatedDoujinshiDto(totalItems int, totalPages int, pageNumber int, pageSize int, items []DoujinshiDto) PaginatedDoujinshiDto {
	dto := PaginatedDoujinshiDto{}

	dto.TotalItems = totalItems
	dto.TotalPages = totalPages
	dto.PageNumber = pageNumber
	dto.PageSize = pageSize
	dto.Items = items

	return dto
}
