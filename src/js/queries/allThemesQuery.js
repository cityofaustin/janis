const allThemesQuery = `
  query allThemesQuery {
    allThemes {
      edges {
        node {
          id
          slug
          text
          description
          topics {
            edges {
              node {
                text
                slug
                description
                services(first: 4) {
                  edges {
                    node {
                      id
                      title
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
  }`;

export default allThemesQuery;
