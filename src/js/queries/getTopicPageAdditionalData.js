const getTopicPageAdditionalData = `
  query getTopicPageAdditionalData($tc_id: ID, $topic_id: ID) {
    topicCollectionTopics(topicCollection: $tc_id) {
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
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
    basePageTopics(topic: $topic_id) {
      edges {
        node {
          page {
            id
            title
            slug
            live
          }
          pageId
        }
      }
    }
  }
`;

export default getTopicPageAdditionalData;

    