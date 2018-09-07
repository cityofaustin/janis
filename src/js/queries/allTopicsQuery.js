const allTopicsQuery = `
  query allTopicsQuery {
    allTopics{
      edges {
        node {
          id,
          slug,
          text,
          description,
          callToAction,
          servicepageSet {
            edges {
              node {
                id,
                title,
                slug
              }
            }
          }
          theme {
            text,
            slug
          }
        }
      }
    }
  }`;

export default allTopicsQuery;
