const topicPageQuery = `
  query topicPageQuery($pk:ID) {
    allTopics(id: $pk) {
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

export default topicPageQuery;
