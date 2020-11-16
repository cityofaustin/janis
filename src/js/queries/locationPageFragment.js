const locationPageFragment = `
  fragment locationPageInfo on LocationPageNode {
    id
    title
    departments {
      id
      title
      slug
    }
    physicalStreet
    physicalUnit
    physicalCity
    physicalState
    physicalZip
    mailingStreet
    mailingCity
    mailingState
    mailingZip
    phoneNumber
    phoneDescription
    email
    nearestBus1
    nearestBus2
    nearestBus3
    physicalLocationPhoto {
      id
      filename
      title
    }
    mondayStartTime
    mondayEndTime
    mondayStartTime2
    mondayEndTime2
    tuesdayStartTime
    tuesdayEndTime
    tuesdayStartTime2
    tuesdayEndTime2
    wednesdayStartTime
    wednesdayEndTime
    wednesdayStartTime2
    wednesdayEndTime2
    thursdayStartTime
    thursdayEndTime
    thursdayStartTime2
    thursdayEndTime2
    fridayStartTime
    fridayEndTime
    fridayStartTime2
    fridayEndTime2
    saturdayStartTime
    saturdayEndTime
    saturdayStartTime2
    saturdayEndTime2
    sundayStartTime
    sundayEndTime
    sundayStartTime2
    sundayEndTime2
    hoursExceptions
    relatedServices {
      edges {
        node {
          relatedService {
            id
            title
            janisUrls
            contact {
              phoneNumbers {
                edges {
                  node {
                    id
                    phoneNumber
                    phoneDescription
                  }
                }
              }
            }
          }
          hoursSameAsLocation
          mondayStartTime
          mondayEndTime
          mondayStartTime2
          mondayEndTime2
          tuesdayStartTime
          tuesdayEndTime
          tuesdayStartTime2
          tuesdayEndTime2
          wednesdayStartTime
          wednesdayEndTime
          wednesdayStartTime2
          wednesdayEndTime2
          thursdayStartTime
          thursdayEndTime
          thursdayStartTime2
          thursdayEndTime2
          fridayStartTime
          fridayEndTime
          fridayStartTime2
          fridayEndTime2
          saturdayStartTime
          saturdayEndTime
          saturdayStartTime2
          saturdayEndTime2
          sundayStartTime
          sundayEndTime
          sundayStartTime2
          sundayEndTime2
          hoursExceptions
        }
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

export default locationPageFragment;
