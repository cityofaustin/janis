import departmentPageFragment from './departmentPageFragment';

const getDepartmentPageRevisionQuery = `
  query getPageRevision($id: ID) {
    pageRevision(id: $id) {
      id
      asDepartmentPage {
        ...departmentPageInfo
      }
    }
  }
  ${departmentPageFragment}
`;

export default getDepartmentPageRevisionQuery;
