const allTopicPagesQuery = `
  query allTopicPagesQuery {
    allTopics{
      edges {
        node {
          id,
          slug,
          text,
          description,
          services {
            edges {
              node {
                id,
                title,
                slug
              }
            }
          }
        }
      }
    }
  }`;

export default allTopicPagesQuery;
