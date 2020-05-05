const getSearchIndexQuery = `
  query getSearchIndex {
    allPages(live: true) {
      edges {
        node {
          title
          janisUrls
          pageType
          summery
          janisbasepagewithtopics {
            topics {
              title
            }
          }
        }
      }
    }
  }
`;

export default getSearchIndexQuery
