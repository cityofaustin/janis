import formPageFragment from './formPageFragment';

const getFormPageQuery = `
  query getFormPage($id: ID) {
    allFormPages(id:$id) {
      edges {
        node {
          ...formPageInfo
        }
      }
    }
  }
`

export default getFormPageQuery
