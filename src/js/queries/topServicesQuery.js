const topServicesQuery = `
  query topServices {
    allServicePages(first: 4) {
      edges {
        node {
          id
          title
          slug
          topics {
            edges {
              node {
                topic {
                  id,
                  slug,
                  title,
                  description,
                  topiccollections {
                    edges {
                      node {
                        topiccollection {
                          id
                          title
                          slug
                          theme {
                            id
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
        }
      }
    }
  }
`;

export default topServicesQuery;
