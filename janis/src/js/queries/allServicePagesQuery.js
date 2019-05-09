import servicePageFragment from './servicePageFragment';

const allServicePagesQuery = `
  query allServicePages {
    allServicePages(live:true) {
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
