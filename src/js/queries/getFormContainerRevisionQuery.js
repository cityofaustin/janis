import formContainerFragment from './formContainerFragment';

const getFormContainerRevisionQuery = `
  query getPageRevision($id: ID) {
    pageRevision(id: $id) {
      id
      asFormContainer {
        ...formContainerInfo
      }
    }
  }
  ${formContainerFragment}
`;

export default getFormContainerRevisionQuery;
