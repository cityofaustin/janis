export const isMuniCourt = contextualNavData => {
  console.log(!!contextualNavData.offeredBy.length)
  console.log(contextualNavData.offeredBy[0])
  if (
    !!contextualNavData.offeredBy.length &&
    contextualNavData.offeredBy[0].url === '/municipal-court/'
  ) {
    return true;
  }
  return false;
};
