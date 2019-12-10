const allGuidePagesSectionsQuery = `
  query allGuidePagesSectionsQuery {
    allGuidePages {
      edges {
        node {
          title
          slug
          topics {
            edges {
              node {
                topic {
                  slug
                  topiccollections {
                    edges {
                      node {
                        topiccollection {
                          slug
                          theme {
                            slug
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          sections {
            heading
            pages {
              servicePage {
                id
                pageType
              }
              informationPage {
                id
                pageType
  						}
            }
          }
        }
      }
    }
  }
`;

export default allGuidePagesSectionsQuery;
