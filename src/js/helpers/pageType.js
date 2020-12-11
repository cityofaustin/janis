export const isMuniCourt = (contextualNavData) => {
  if (contextualNavData.offeredBy && contextualNavData.offeredBy[0].url === "/municipal-court/") {
    return true
  }
  return false
} 