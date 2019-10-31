import informationPageFragment from './informationPageFragment';

const globalInformationPagesQuery = `
  query allInformationPages {
    allInformationPages(live: true, coaGlobal: true) {
      edges {
        node {
          ...informationPageInfo
          coaGlobal
        }
      }
    }
  }
  ${informationPageFragment}
`;

export default globalInformationPagesQuery;
