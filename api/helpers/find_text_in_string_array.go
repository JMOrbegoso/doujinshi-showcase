package helpers

import "strings"

func FindTextInStringArray(array []string, text string) bool {
	for _, x := range array {
		if strings.Contains(strings.ToUpper(x), strings.ToUpper(text)) {
			return true
		}
	}
	return false
}
