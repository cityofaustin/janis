const getDepartmentsPageQuery = `
  query getDepartmentsPageQuery {
    allDepartmentPages {
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
