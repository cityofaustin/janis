import topicFragment from './topicFragment';

const allTopicsQuery = `
  query allTopicsQuery {
    allTopics(live:true) {
      edges {
        node {
          ...topicInfo
        }
      }
    }
  }
  ${topicFragment}
`;

export default allTopicsQuery;
