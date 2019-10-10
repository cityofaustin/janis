import topicFragment from './topicFragment';

const getTopicPageQuery = `
  query getTopicPage($id: ID) {
    allTopics(id: $id) {
      edges {
        node {
          id
          ...topicInfo
        }
      }
    }
  }
  ${topicFragment}
`;

export default getTopicPageQuery;
