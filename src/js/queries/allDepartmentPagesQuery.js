const allDepartmentPagesQuery = `
  query allDepartmentPagesQuery($id: ID) {
    Department(id: $id) {
      id
      name
      mission
      contacts {
        name
        phone
        location {
          id
          name
          street
          city
          state
          country
          zip
        }
        hours {
          dayOfWeek
          startTime
          endTime
        }
      }
    }
  }
`;

export default allDepartmentPagesQuery;
