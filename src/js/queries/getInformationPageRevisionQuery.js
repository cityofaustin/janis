import informationPageFragment from './informationPageFragment';

const getInformationPageRevisionQuery = `
  query getPageRevision($id: ID) {
    pageRevision(id: $id) {
      id
      asInformationPage {
        ...informationPageInfo
      }
    }
  }
  ${informationPageFragment}
`;

export default getInformationPageRevisionQuery;
