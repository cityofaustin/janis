const contactFragment = `
  fragment contactInfo on ContactNode {
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
    locationPage {
      id
      title
      slug
      physicalStreet
      physicalUnit
      physicalCity
      physicalState
      physicalCountry
      physicalZip
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
`;

export default contactFragment;
