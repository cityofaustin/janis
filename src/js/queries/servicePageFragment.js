import conciseContactFragment from './conciseContactFragment';

const servicePageFragment = `
  fragment servicePageInfo on ServicePageNode {
    id
    title
    coaGlobal
    departments {
      id
      title
      slug
    }
    steps
    dynamicContent
    additionalContent
    shortDescription
    contact {
      ...contactInfo
    }
    events {
      id
      title
      slug
      date,
      startTime,
      endTime,
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
      eventIsFree,
      registrationUrl,
      canceled,
      fees {
        edges {
          node {
            feeLabel
            fee
          }
        }
      }
    }
  }
  ${conciseContactFragment}
`;

export default servicePageFragment;
