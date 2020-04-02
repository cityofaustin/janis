const getContextualNavTopicDataQuery = `
  query getContextualNavTopicDataQuery($parent_topic:ID, $grandparent_topic_collection:ID) {
    allTopics(id:$parent_topic) {
      edges {
        node {
          id
          slug
          title
        }
      }
    }
    allTopicCollections(id:$grandparent_topic_collection) {
      edges {
        node {
          id
          slug
          theme {
            id
            slug
          }
        }
      }
    }
  topicCollectionTopics(topicCollection:$grandparent_topic_collection) {
      edges {
        node {
          page {
            topicpage{
              id
              slug
              title
            }
          }
        }
      }
    }
  }
`;

export default getContextualNavTopicDataQuery;
