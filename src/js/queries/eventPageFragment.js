import conciseContactFragment from './conciseContactFragment';

/*
In the future it might be cool to update the Joplin API to support a structure like:

locations {
  locationType
  
  name
  street
  city
  state
  zip
  unit
  additionalDetails

  cityLocationPageId
  cityLocationPageUrl
}

to avoid duplicated logic from differently named vars. This is currently happening in EventDetailCard

*/

const eventPageFragment = `
  fragment eventPageInfo on EventPageNode {
    id
    title
    description
    canceled
    date
    startTime
    endTime
    slug
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
        physicalUnit
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
