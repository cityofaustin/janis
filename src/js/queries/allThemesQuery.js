const allThemesQuery = `
  query allThemesQuery {
    allThemes {
      edges {
        node {
          id
          slug
          text
          description
          topicPages {
            edges {
              node {
                title
                slug
                description
              }
            }
          }
        }
      }
    }
  }`;

export default allThemesQuery;
