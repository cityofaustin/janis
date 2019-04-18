const allThemesQuery = `
  query allThemesQuery {
    allThemes {
      edges {
        node {
          id
          slug
          text
          description
          topicCollectionPages {
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
