package helpers

import "strings"

// Check if the array2 elements exist in the array1
func ArrayContainsArray(array1 []string, array2 []string) bool {
	for _, item := range array2 {
		if !contains(array1, item) {
			return false
		}
	}
	return true
}

func contains(array []string, item string) bool {
	for _, element := range array {
		if strings.EqualFold(element, item) {
			return true
		}
	}
	return false
}
