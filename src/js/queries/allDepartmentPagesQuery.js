const allDepartmentPagesQuery = `
  query allDepartmentPagesQuery {
    allDepartments {
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
