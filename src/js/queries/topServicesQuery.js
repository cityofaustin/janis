const topServicesQuery = `
  query topServices {
    allServicePages(first: 4) {
      id
      title
      slug
      topic {
        id
        text
      }
    }
  }
`;

export default topServicesQuery;
