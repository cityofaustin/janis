export function buildPages(allData, itemsPerPage) {
  const pages = []
  for (var i = 0; i < allData.length; i += itemsPerPage) {
    pages.push(allData.slice(i, i + itemsPerPage))
  }
  return pages
}

export function buildPagination(pages, maxPagesShown, pageNumber) {
  if (pages.length < 2) return []
  let shownPages = [pageNumber+1]

  for (var i = 1; i < maxPagesShown; i++) {
    // Add the next page # and/or the previous page # if page exists
    if (pageNumber + i <= pages.length - 1) shownPages.push(pageNumber + i + 1)
    if (pageNumber + (i*-1) >= 0) shownPages.unshift(pageNumber + (i*-1) + 1)
    // If all slots are filled, break loop.
    if (shownPages.length >= maxPagesShown) break
  }

  // replace first and last pageNumber in list with ellipsis if there is more than 1 page in either direction...
  if (shownPages[0] > 1) shownPages[0] = "..."
  if (shownPages[shownPages.length -1] < pages.length) shownPages[shownPages.length -1] = "..."

  return shownPages
}