const eventPageFragment = `
  fragment eventPageInfo on EventPageNode {
    id
    title
    description
    locations {
      additionalDetails
      locationType
      cityLocation {
        id
        title 
      }
      remoteLocation {
        name
        street
        city
        state
        zip
      }
    }
  }
`;

export default eventPageFragment;
