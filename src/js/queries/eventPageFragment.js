import conciseContactFragment from './conciseContactFragment';

const eventPageFragment = `
  fragment eventPageInfo on EventPageNode {
    id
    title
    description
    canceled
    date
    startTime
    endTime
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
        physicalStreet
        physicalCity
        physicalState
        physicalZip
        slug
      }
      remoteLocation {
        name
        street
        city
        state
        zip
        unit
      }
    }
    eventIsFree
    fees {
      edges {
        node {
          feeLabel
          fee
        }
      }
    }
    registrationUrl
  }
  ${conciseContactFragment}
`;

export default eventPageFragment;
