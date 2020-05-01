const formContainerFragment = `
  fragment formContainerInfo on FormContainerNode {
    id
    title
    slug
    description
    formUrl
    departments {
      id
      title
      slug
    }
  }
`;

export default formContainerFragment;
