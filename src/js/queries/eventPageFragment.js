const eventPageFragment = `
  fragment eventPageInfo on EventPageNode {
    id
    title
    description
    date
    relatedDepartments {
      edges {
        node {
          relatedDepartment {
            id
            title
            slug
          }
        }
      }
    }
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
