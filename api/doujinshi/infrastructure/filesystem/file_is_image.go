package filesystem

import (
	"strings"
)

func FileIsImage(fileExtension string) bool {
	imageExtensions := []string{".bmp", ".gif", ".heic", ".jfif", ".jpeg", ".jpg", ".png", ".svg", ".tif", ".tiff", ".webp"}

	return strings.Contains(strings.Join(imageExtensions, ","), fileExtension)
}
