const topicCollectionFragment = `
  fragment topicCollectionInfo on TopicCollectionNode {
    id
    slug
    title
    theme {
      id
      text
      slug
    }
  }
`;

export default topicCollectionFragment;
