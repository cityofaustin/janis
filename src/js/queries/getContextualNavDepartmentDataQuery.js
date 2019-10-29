const getContextualNavDepartmentDataQuery = `
  query getContextualNavDepartmentDataQuery($parent_department:ID) {
    allDepartmentPages(id:$parent_department) {
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

export default getContextualNavDepartmentDataQuery;
