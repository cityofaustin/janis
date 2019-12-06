const allGuidePagesSections = `
  query getGuidePage($id: ID) {
    allGuidePages {
      edges {
        node {
          id
          slug
          sections {
            pages {
              informationPage {
                id,
                title
              }
              servicePage {
                id,
                title
              }
            }
          }
        }
      }
    }
  }
`;

export default allGuidePagesSections;
