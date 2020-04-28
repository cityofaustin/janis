const getSearchIndexQuery = `
  query getSearchIndex {
    allPages(live: true) {
      edges {
        node {
          id
          title
          janisUrls
          pageType
          summery
        }
      }
    }
  }
`;

export default getSearchIndexQuery
