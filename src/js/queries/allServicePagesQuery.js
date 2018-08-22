import servicePageFragment from './servicePageFragment';

const allServicePagesQuery = `
  query allServicePages {
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
