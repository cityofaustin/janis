export function buildPages(allData, itemsPerPage) {
  const pages = []
  for (var i = 0; i < allData.length; i += itemsPerPage) {
    pages.push(allData.slice(i, i + itemsPerPage))
  }
  return pages
}

/**
  Returns an array of pageSelectorValues, the values that are displayed
  in the PageSelector.
  ex:
    [1, 2] if there are only 2 pages total.
    [1,2,3,4,5,"..."] if there are many pages and current pageNumber === 1
    ["...", 4,5,6,7,8, "..."] if there are many pages and current pageNumber === 6

**/
export function buildPageSelectorValues(pagesCount, maxPagesShown, pageNumber) {
  if (pagesCount < 2) return []
  let pageSelectorValues = [{
    "pageNumberDisplayed": pageNumber,
    "pageNumberValue": pageNumber,
  }]

  for (let i = 1; i < maxPagesShown; i++) {
    // Add the next pageNumber if page exists
    let nextPageNumber = pageNumber + i;
    if (nextPageNumber <= pagesCount) {
      pageSelectorValues.push({
        "pageNumberDisplayed": nextPageNumber,
        "pageNumberValue": nextPageNumber
      })
    }
    // Add the previous pageNumber if page exists
    let previousPageNumber = pageNumber - i;
    if (previousPageNumber > 0) {
      pageSelectorValues.unshift({
        "pageNumberDisplayed": previousPageNumber,
        "pageNumberValue": previousPageNumber
      })
    }
    // If all slots are filled, break loop.
    if (pageSelectorValues.length >= maxPagesShown) break
  }

  // replace first and last pageNumber in list with ellipsis if there is more than 1 page in either direction...
  if (pageSelectorValues[0]["pageNumberValue"] > 1) {
    pageSelectorValues[0]["pageNumberDisplayed"] = "..."
  }
  if (pageSelectorValues[pageSelectorValues.length-1]["pageNumberValue"] < pagesCount-1) {
    pageSelectorValues[pageSelectorValues.length -1]["pageNumberDisplayed"] = "..."
  }

  return pageSelectorValues
}
