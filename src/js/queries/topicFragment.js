const topicFragment = `
  fragment topicInfo on TopicNode {
    id,
    slug,
    title,
    description,
    topiccollections {
      edges {
        node {
          topiccollection {
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
      }
    }
  }
`;

export default topicFragment;
