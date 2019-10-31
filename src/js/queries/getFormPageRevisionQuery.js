import formPageFragment from './formPageFragment';

const getFormPageRevisionQuery = `
  query getPageRevision($id: ID) {
    pageRevision(id: $id) {
      id
      asFormPage {
        ...formPageInfo
      }
    }
  }
  ${formPageFragment}
`;

export default getFormPageRevisionQuery;
