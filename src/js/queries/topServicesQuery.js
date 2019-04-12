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
                  id
                  slug
                  title
                  theme {
                    id
                    slug
                    text
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
