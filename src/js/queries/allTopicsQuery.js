const allTopicsQuery = `
  query allTopicsQuery {
    allTopics{
      edges {
        node {
          id,
          slug,
          title,
          description,
          callToAction,
          theme {
            text,
            slug,
            id
          }
        }
      }
    }
  }`;

export default allTopicsQuery;
