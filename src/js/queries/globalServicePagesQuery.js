import servicePageFragment from './servicePageFragment';

const globalServicePagesQuery = `
  query allServicePages {
    allServicePages(live:true, coaGlobal: true) {
      edges {
        node {
          ...servicePageInfo
          coaGlobal
        }
      }
    }
  }
  ${servicePageFragment}
`;

export default globalServicePagesQuery;
