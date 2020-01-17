const conciseContactFragment = `
  fragment contactInfo on ContactNode {
    name
    phoneNumber {
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
