const getLocationPageQuery = `
  query getLocationPage($id: ID) {
    allLocationPages(id: $id) {
      edges {
        node {
          id
          title
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
        }
      }
    }
  }
`;

export default getLocationPageQuery;
