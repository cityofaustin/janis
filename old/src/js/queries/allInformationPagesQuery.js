import informationPageFragment from './informationPageFragment';

const allInformationPagesQuery = `
  query allInformationPages {
    allInformationPages(live:true) {
      edges {
        node {
          ...informationPageInfo
        }
      }
    }
  }
  ${informationPageFragment}
`;

export default allInformationPagesQuery;
