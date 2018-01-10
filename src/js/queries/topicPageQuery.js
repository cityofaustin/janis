const topicPageQuery = `
  query topicPageQuery($id:ID) {
    allTopics(id: $id) {
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
