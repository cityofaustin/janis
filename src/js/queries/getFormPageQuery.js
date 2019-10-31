const getFormPageQuery = `
  query getFormPage($id: ID) {
    allFormPages(id:$id) {
      edges {
        node {
          id
          title
          slug
          description
          formUrl
          relatedDepartments {
            edges {
              node {
                relatedDepartment {
                  id
                  title
                  slug
                }
              }
            }
          }
        }
      }
    }
  }
`

export default getFormPageQuery
