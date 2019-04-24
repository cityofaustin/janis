const topicCollectionFragment = `
  fragment topicCollectionInfo on TopicCollectionNode {
    id
    slug
    title
    theme {
      id
    }
  }
`;

export default topicCollectionFragment;
