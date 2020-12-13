export const isMuniCourt = contextualNavData => {
  if (
    !!contextualNavData.offeredBy.length &&
    contextualNavData.offeredBy[0].url === '/municipal-court/'
  ) {
    return true;
  }
  return false;
};
