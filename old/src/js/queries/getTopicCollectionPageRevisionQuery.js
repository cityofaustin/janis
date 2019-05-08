import topicCollectionFragment from './topicCollectionFragment';

const getTopicCollectionPageRevisionQuery = `
  query getPageRevision($id: ID) {
    pageRevision(id: $id) {
      id
      asTopicCollectionPage {
        ...topicCollectionInfo
      }
    }
  }
  ${topicCollectionFragment}
`;

export default getTopicCollectionPageRevisionQuery;
