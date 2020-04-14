const conciseContactFragment = `
  fragment contactInfo on ContactNode {
    name
    phoneNumbers {
      edges {
        node {
          id
          phoneDescription
          phoneNumber
        }
      }
    }
    email
    socialMedia
  }
`;

export default conciseContactFragment;
