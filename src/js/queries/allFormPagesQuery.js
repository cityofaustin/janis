import formPageFragment from './formPageFragment';

const allFormPagesQuery = `
  query allFormPages {
    allFormPages(live:true) {
      edges {
        node {
          ...formPageInfo
        }
      }
    }
  }
  ${formPageFragment}
`;

export default allFormPagesQuery;
