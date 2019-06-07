const allThemesQuery = `
  query allThemesQuery {
    allThemes {
      edges {
        node {
          id
          slug
          text
          description
          topicCollectionPages(live:true) {
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
