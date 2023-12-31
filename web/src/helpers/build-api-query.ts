export function BuildApiQuery({
  searchFilter,
  titleFilters,
  artistFilters,
  circleFilters,
  categoryFilters,
  tagFilters,
  parodyFilters,
  characterFilters,
  quantity,
  random,
  pageNumber,
  pageSize,
}: {
  searchFilter?: string | null | undefined;
  titleFilters?: string[];
  artistFilters?: string[];
  circleFilters?: string[];
  categoryFilters?: string[];
  tagFilters?: string[];
  parodyFilters?: string[];
  characterFilters?: string[];
  quantity?: number;
  random?: boolean;
  pageNumber?: number;
  pageSize?: number;
}): string {
  const titleFiltersJoined = titleFilters?.join('&title=');
  const artistFiltersJoined = artistFilters?.join('&artist=');
  const circleFiltersJoined = circleFilters?.join('&circle=');
  const categoryFiltersJoined = categoryFilters?.join('&category=');
  const tagFiltersJoined = tagFilters?.join('&tag=');
  const parodyFiltersJoined = parodyFilters?.join('&parody=');
  const characterFiltersJoined = characterFilters?.join('&character=');

  let query: string = '';

  if (searchFilter) {
    query = query + '?search=' + searchFilter;
  }

  if (titleFiltersJoined) {
    if (!query.includes('?')) query = query + '?title=' + titleFiltersJoined;
    else query = query + '&title=' + titleFiltersJoined;
  }

  if (artistFiltersJoined) {
    if (!query.includes('?')) query = query + '?artist=' + artistFiltersJoined;
    else query = query + '&artist=' + artistFiltersJoined;
  }

  if (circleFiltersJoined) {
    if (!query.includes('?')) query = query + '?circle=' + circleFiltersJoined;
    else query = query + '&circle=' + circleFiltersJoined;
  }

  if (categoryFiltersJoined) {
    if (!query.includes('?')) query = query + '?category=' + categoryFiltersJoined;
    else query = query + '&category=' + categoryFiltersJoined;
  }

  if (tagFiltersJoined) {
    if (!query.includes('?')) query = query + '?tag=' + tagFiltersJoined;
    else query = query + '&tag=' + tagFiltersJoined;
  }

  if (parodyFiltersJoined) {
    if (!query.includes('?')) query = query + '?parody=' + parodyFiltersJoined;
    else query = query + '&parody=' + parodyFiltersJoined;
  }

  if (characterFiltersJoined) {
    if (!query.includes('?')) query = query + '?character=' + characterFiltersJoined;
    else query = query + '&character=' + characterFiltersJoined;
  }

  if (quantity) {
    if (!query.includes('?')) query = query + '?quantity=' + quantity;
    else query = query + '&quantity=' + quantity;
  }

  if (random) {
    if (!query.includes('?')) query = query + '?random=true';
    else query = query + '&random=true';
  }

  if (pageNumber) {
    if (!query.includes('?')) query = query + `?page_number=${pageNumber}`;
    else query = query + `&page_number=${pageNumber}`;
  }

  if (pageSize) {
    if (!query.includes('?')) query = query + `?page_size=${pageSize}`;
    else query = query + `&page_size=${pageSize}`;
  }

  return query;
}
