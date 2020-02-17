export function buildPages(allData, itemsPerPage) {
    const pages = []
    for (var i = 0; i < allData.length; i += itemsPerPage) {
      pages.push(allData.slice(i, i + itemsPerPage))
    }
    return pages
  }