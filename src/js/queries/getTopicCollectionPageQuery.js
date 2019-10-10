import topicCollectionFragment from './topicCollectionFragment';

const getTopicCollectionPageQuery = `
  query getTopicCollectionPage($id: ID) {
    allTopicCollections(id: $id) {
      edges {
        node {
          id
          ...topicCollectionInfo
        }
      }
    }
  }
  ${topicCollectionFragment}
`;

export default getTopicCollectionPageQuery;
