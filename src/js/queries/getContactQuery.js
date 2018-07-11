const getContactQuery = `
  query getContact($id: ID) {
    allContacts(id: $id) {
      edges {
        node {
          id
          name
          email
          phone
          hours {
            edges {
              node {
                dayOfWeek
                startTime
                endTime
              }
            }
          }
          location {
            name
            street
            city
            state
            zip
            country
          }
        }
      }
    }
  }
`;

export default getContactQuery;
