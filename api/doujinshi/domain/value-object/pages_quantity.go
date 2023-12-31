package valueobject

type PagesQuantity struct {
	value uint16
}

func (v *PagesQuantity) GetQuantity() uint16 {
	return v.value
}

func NewPages(pagesQuantity uint16) (PagesQuantity, error) {
	newPagesQuantity := PagesQuantity{}
	newPagesQuantity.value = pagesQuantity
	return newPagesQuantity, nil
}
