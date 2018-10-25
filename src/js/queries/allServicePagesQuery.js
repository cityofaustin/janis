import servicePageFragment from './servicePageFragment';

const allServicePagesQuery = `
  query allServicePages(live:true) {
    allServicePages {
      edges {
        node {
          ...servicePageInfo
        }
      }
    }
  }
  ${servicePageFragment}
`;

export default allServicePagesQuery;
