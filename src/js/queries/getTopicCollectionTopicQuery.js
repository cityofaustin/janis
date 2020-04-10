const getTopicCollectionTopicsQuery = `
  query getTopicCollectionTopics($id: ID) {
    topicCollectionTopics(topicCollection: $id) {
      edges {
        node {
          page {
            topicpage {
              id
              live
              slug
              title
              description
              topPages {
                edges {
                  node {
                    title
                    slug
                    pageType
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default getTopicCollectionTopicsQuery;

    