const allTopicCollectionsQuery = `
  query allTopicsQuery {
    allTopicCollections {
      edges {
        node {
          id
          slug
          title
          theme {
            id
          }
        }
      }
    }
  }`;

export default allTopicCollectionsQuery;
