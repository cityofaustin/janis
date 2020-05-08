const newsPageContentFragment = `
  fragment newsPageContentInfo on NewsPageNode {
    id
    title
    body
    contact {
      phoneNumbers {
        edges {
          node {
            phoneNumber
            phoneDescription
          }
        }
      }
      email
    }
  }
`;

export default newsPageContentFragment;
