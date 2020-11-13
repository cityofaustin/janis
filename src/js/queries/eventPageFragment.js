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

// replaced the concise contact fragment with the query so allPageQuery does not throw an error about duplicate
// fragments
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
    departments {
      id
      title
      slug
    }
    locations {
      additionalDetails
      locationType
      cityOfAustinLocation {
        id
        title
        physicalStreet
        physicalCity
        physicalState
        physicalZip
        physicalUnit
        slug
      }
      remoteNonCoaLocation {
        name
        street
        city
        state
        zip
        unit
      }
      virtualEvent {
        eventLink
        additionalInformation
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
`;

export default eventPageFragment;

