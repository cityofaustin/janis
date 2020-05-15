const newsPageFragment = `
  fragment newsPageInfo on NewsPageNode {
    id
    lastPublishedAt
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
      socialMedia
    }
  }
`;

export default newsPageFragment;
