const topServicesQuery = `
  query topServices {
    allServicePages(first: 4) {
      edges {
        node {
          id
          title
          slug
          topic {
            id
            slug
            theme {
              slug
            }
            text
          }
        }
      }
    }
  }
`;

export default topServicesQuery;
