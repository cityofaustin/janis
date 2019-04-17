const allTopicCollectionsQuery = `
  query allTopicsQuery {
    allTopicCollections {
      edges {
        node {
          id
          slug
          title
        }
      }
    }
  }`;

export default allTopicCollectionsQuery;
