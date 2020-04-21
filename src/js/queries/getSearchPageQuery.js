const getSearchPageQuery = `
  query allPages(live: true) {
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

export default getSearchPageQuery
