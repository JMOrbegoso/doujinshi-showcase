package usecases

import (
	"math/rand"
	"sort"
	"strings"
	"time"

	"github.com/jmorbegoso/doujinshi-showcase/api/doujinshi/domain/aggregate"
	"github.com/jmorbegoso/doujinshi-showcase/api/doujinshi/domain/repository"
	"github.com/jmorbegoso/doujinshi-showcase/api/helpers"
)

func GetDoujinshiUseCase(doujinshiRepository repository.DoujinshiRepository, searchFilter string, quantity uint, randomSort bool, titleFilters []string, artistFilters []string, circleFilters []string, categoryFilters []string, characterFilters []string, parodyFilters []string, tagFilters []string) ([]aggregate.Doujinshi, error) {
	allDoujinshi, err := doujinshiRepository.GetAll()
	if err != nil {
		return nil, err
	}

	doujinshiFound := []aggregate.Doujinshi{}

	for _, d := range allDoujinshi {
		// Check if search filter is being used
		if searchFilter != "" {
			// Merge all doujinshi properties to search on a single string array
			mergedProperties := []string{}
			mergedProperties = append(mergedProperties, d.GetTitle())
			mergedProperties = append(mergedProperties, d.GetArtistsNames()...)
			mergedProperties = append(mergedProperties, d.GetCirclesNames()...)
			mergedProperties = append(mergedProperties, d.GetCategoryName())
			mergedProperties = append(mergedProperties, d.GetParodyNames()...)
			mergedProperties = append(mergedProperties, d.GetCharacterNames()...)
			mergedProperties = append(mergedProperties, d.GetTagNames()...)

			// Check if any of the merged doujinshi properties contains the searched text
			if !helpers.FindTextInStringArray(mergedProperties, searchFilter) {
				continue
			}
		}

		// Check if title filter is being used
		if len(titleFilters) > 0 {
			// Check if the current doujinshi contains at least part of one of the requested titles
			titles := []string{}
			titles = append(titles, d.GetTitle())
			if !helpers.ArrayContainsStringFromArray(titles, titleFilters) {
				continue
			}
		}

		// Check if artists filter is being used
		if len(artistFilters) > 0 {
			// Check if the current doujinshi contains at all of the requested artists
			if !helpers.ArrayContainsArray(d.GetArtistsNames(), artistFilters) {
				continue
			}
		}

		// Check if circles filter is being used
		if len(circleFilters) > 0 {
			// Check if the current doujinshi contains at all of the requested circles
			if !helpers.ArrayContainsArray(d.GetCirclesNames(), circleFilters) {
				continue
			}
		}

		// Check if category filter is being used
		if len(categoryFilters) > 0 {
			// Check if the current doujinshi contains at all of the requested categories
			categories := []string{}
			categories = append(categories, d.GetCategoryName())
			if !helpers.ArrayContainsArray(categories, categoryFilters) {
				continue
			}
		}

		// Check if characters filter is being used
		if len(characterFilters) > 0 {
			// Check if the current doujinshi contains at all of the requested characters
			if !helpers.ArrayContainsArray(d.GetCharacterNames(), characterFilters) {
				continue
			}
		}

		// Check if parodies filter is being used
		if len(parodyFilters) > 0 {
			// Check if the current doujinshi contains at all of the requested parodies
			if !helpers.ArrayContainsArray(d.GetParodyNames(), parodyFilters) {
				continue
			}
		}

		// Check if tags filter is being used
		if len(tagFilters) > 0 {
			// Check if the current doujinshi contains at all of the requested tags
			if !helpers.ArrayContainsArray(d.GetTagNames(), tagFilters) {
				continue
			}
		}

		// Add the doujinshi
		doujinshiFound = append(doujinshiFound, *d)
	}

	// Sort doujinshi alphabetically
	sort.Slice(doujinshiFound, func(i, j int) bool {
		return strings.ToUpper(doujinshiFound[i].GetTitle()) < strings.ToUpper(doujinshiFound[j].GetTitle())
	})

	if randomSort {
		// Random shuffle
		rand.New(rand.NewSource(time.Now().UnixNano()))
		rand.Shuffle(len(doujinshiFound), func(i, j int) {
			doujinshiFound[i], doujinshiFound[j] = doujinshiFound[j], doujinshiFound[i]
		})
	}

	if quantity > 0 {
		// Return the first n doujinshi
		n := int(quantity)
		if n <= 0 || n > len(doujinshiFound) {
			n = len(doujinshiFound)
		}

		doujinshiFound = doujinshiFound[:n]
	}

	return doujinshiFound, nil
}
