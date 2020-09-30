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
    [1,2,3,4,5,6,"..."] if there are many pages and current pageNumber === 1
    ["...", 4,5,6,7,8, "..."] if there are many pages and current pageNumber === 6

**/
export function buildPageSelectorValues(pages, maxPagesShown, pageNumber) {
  if (pages.length < 2) return []
  let pageSelectorValues = [pageNumber+1]

  for (var i = 1; i < maxPagesShown; i++) {
    // Add the next page # and/or the previous page # if page exists
    if (pageNumber + i <= pages.length - 1) pageSelectorValues.push(pageNumber + i + 1)
    if (pageNumber + (i*-1) >= 0) pageSelectorValues.unshift(pageNumber + (i*-1) + 1)
    // If all slots are filled, break loop.
    if (pageSelectorValues.length >= maxPagesShown) break
  }

  // replace first and last pageNumber in list with ellipsis if there is more than 1 page in either direction...
  if (pageSelectorValues[0] > 1) pageSelectorValues[0] = "..."
  if (pageSelectorValues[pageSelectorValues.length -1] < pages.length) pageSelectorValues[pageSelectorValues.length -1] = "..."

  return pageSelectorValues
}
