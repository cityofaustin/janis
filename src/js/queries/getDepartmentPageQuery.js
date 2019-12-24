import departmentPageFragment from './departmentPageFragment';

const getDepartmentPageQuery = `
  query getDepartmentPage($id: ID) {
    allDepartmentPages(id: $id) {
      edges {
        node {
          ...departmentPageInfo
        }
      }
    }
  }
  ${departmentPageFragment}
`;

export default getDepartmentPageQuery;
