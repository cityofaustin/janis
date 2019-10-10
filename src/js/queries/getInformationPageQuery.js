import informationPageFragment from './informationPageFragment';

const getInformationPageQuery = `
  query getInformationPage($id: ID) {
    allInformationPages(id: $id) {
      edges {
        node {
          id
          ...informationPageInfo
        }
      }
    }
  }  ${informationPageFragment}
`;

export default getInformationPageQuery;
