import topicFragment from './topicFragment';

const getTopicPageRevisionQuery = `
  query getPageRevision($id: ID) {
    pageRevision(id: $id) {
      id
      asTopicPage {
        ...topicInfo
      }
    }
  }
  ${topicFragment}
`;

export default getTopicPageRevisionQuery;
