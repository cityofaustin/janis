export function searchWorker(currentResults, searchString="") {
  if (typeof searchString === 'number') {
    searchString = searchString.toString();
  }

  const terms = searchString.split(' ');

  const filteredResults = currentResults.filter(result => {
    const title = result.title.toLocaleLowerCase();

    /*
      Does the Page title have ALL of the search teams entered?
      - If so, return page as a result
      - Note: a partial strings return true.
        - Example Searching for "now" will return pages with "know" in the title.
    */
    const titleHasAllTerms =
      terms.filter(term => {
        return title.includes(term.toLocaleLowerCase());
      }).length === terms.length;

    return titleHasAllTerms;
  });

  return filteredResults;
}
