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
