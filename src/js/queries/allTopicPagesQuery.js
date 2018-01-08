const allTopicPagesQuery = `
  query allServicePages {
    allTopics{
      edges {
        node {
          id,
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
