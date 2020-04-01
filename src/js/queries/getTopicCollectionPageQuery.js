const getTopicCollectionPageQuery = `
  query getTopicCollectionPage($id: ID) {
    allTopicCollections(id: $id) {
      edges {
        node {
          id
          slug
          title
          description
          theme {
            id
            text
            slug
          }
        }
      }
    }
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

export default getTopicCollectionPageQuery;

    