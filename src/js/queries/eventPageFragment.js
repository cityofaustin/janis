import conciseContactFragment from './conciseContactFragment';

const eventPageFragment = `
  fragment eventPageInfo on EventPageNode {
    id
    title
    description
    date
    canceled
    contact {
      ...contactInfo
    }
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
  ${conciseContactFragment}
`;

export default eventPageFragment;
