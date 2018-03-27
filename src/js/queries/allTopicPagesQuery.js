const allTopicPagesQuery = `
  query allTopicPagesQuery {
    allTopics{
      edges {
        node {
          id,
          slug,
          text,
          description,
          callToAction,
          services {
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

export default allTopicPagesQuery;
