const allGuidePagesSectionsQuery = `
  query allGuidePagesSectionsQuery {
    allGuidePages {
      edges {
        node {
          title
          slug
          pageType
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
