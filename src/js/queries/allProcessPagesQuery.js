const allProcessPagesQuery = `
  query allProcessPages {
    allProcessPages {
      edges {
        node {
          id
          title
          slug
          topic {
            id
            slug
            text
            theme {
              id
              slug
              text
            }
          }
          image {
            id
            filename
            title
          }
          processSteps {
            edges {
              node {
                id
                name
                url
                sortOrder
                page {
                  title
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default allProcessPagesQuery;
