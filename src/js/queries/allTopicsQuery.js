const allTopicsQuery = `
  query allTopicsQuery {
    allTopics{
      edges {
        node {
          id,
          slug,
          title,
          description,
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
