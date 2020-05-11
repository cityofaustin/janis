export function searchWorker(currentResults, searchString) {

  const terms = searchString.split(' ')

  return currentResults.filter( result => {
    const title = result.title.toLocaleLowerCase()

    /*
      Does the Page title have ALL of the search teams entered?
      - If so, return page as a result
      - Note: a partial strings return true.
        - Example Searching for "now" will return pages with "know" in the title.
    */
    const titleHasAllTerms = terms.filter( term => {
      return title.includes( term.toLocaleLowerCase() )
    }).length === terms.length

    return titleHasAllTerms
  })

}
