import departmentPageFragment from './departmentPageFragment';

const allDepartmentPagesQuery = `
  query allDepartmentPages {
    allDepartmentPages(live:true) {
      edges {
        node {
          ...departmentPageInfo
        }
      }
    }
  }
  ${departmentPageFragment}
`;

export default allDepartmentPagesQuery;
