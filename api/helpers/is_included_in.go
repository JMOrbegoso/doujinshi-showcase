package helpers

import "strings"

func IsIncludedIn(a string, b []string) bool {
	for _, x := range b {
		if strings.EqualFold(x, a) {
			return true
		}
	}
	return false
}
