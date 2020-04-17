const allGuidePagesSectionsQuery = `
  query allGuidePagesSectionsQuery {
    allGuidePages {
      edges {
        node {
          id
          title
          slug
          pageType
          sections {
            heading
            pages {
              servicePage {
                id
                pageType
                title
              }
              informationPage {
                id
                pageType
                title
  						}
            }
          }
        }
      }
    }
  }
`;

export default allGuidePagesSectionsQuery;
