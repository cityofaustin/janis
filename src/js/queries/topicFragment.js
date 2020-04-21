const topicFragment = `
  fragment topicInfo on TopicNode {
    id,
    slug,
    title,
    description,
    topiccollections {
            id
            title
            slug
            theme {
              id
              text
              slug
            }
          }
        }
`;

export default topicFragment;
