package helpers

import "strings"

func ArrayContainsStringFromArray(a []string, b []string) bool {
	for _, x := range a {
		for _, y := range b {
			if strings.Contains(strings.ToUpper(x), strings.ToUpper(y)) {
				return true
			}
		}
	}
	return false
}
