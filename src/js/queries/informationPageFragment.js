import phoneFragment from './phoneFragment';

const informationPageFragment = `
  fragment informationPageInfo on InformationPageNode {
    id
    title
    slug
    coaGlobal
    departments {
      id
      title
      slug
    }
    description
    additionalContent
    contact {
      name
      email
      ${phoneFragment}
      locationPage {
        title
      }
      socialMedia
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
`;

export default informationPageFragment;
