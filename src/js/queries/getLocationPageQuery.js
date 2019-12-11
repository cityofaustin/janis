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
        }
      }
    }
  }
`;

export default getLocationPageQuery;
