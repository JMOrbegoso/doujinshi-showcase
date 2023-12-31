package helpers

import "strings"

func CountStringInArray(text string, array []string) uint16 {
	count := uint16(0)

	for _, item := range array {
		if strings.EqualFold(item, text) {
			count++
		}
	}

	return count
}
