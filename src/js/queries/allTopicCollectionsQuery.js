import topicCollectionFragment from './topicCollectionFragment';

const allTopicCollectionsQuery = `
  query allTopicsQuery {
    allTopicCollections(live:true) {
      edges {
        node {
          ...topicCollectionInfo
        }
      }
    }
  }
  ${topicCollectionFragment}
`;

export default allTopicCollectionsQuery;
