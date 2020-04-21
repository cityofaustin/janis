const topicFragment = `
  fragment topicInfo on TopicNode {
    id,
    slug,
    title,
    description,
    topPages {
      edges {
        node {
          id
          title
          slug
        }
      }
    }
  }
`;

export default topicFragment;
