const getDepartmentsPageQuery = `
  query getDepartmentsPageQuery {
    allDepartmentPages(live:true) {
      edges {
        node {
          id
          slug
          title
        }
      }
    }
  }
`;

export default getDepartmentsPageQuery;
