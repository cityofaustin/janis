const getFormContainerQuery = `
  query getFormContainer($id: ID) {
    allFormContainers(id:$id) {
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

export default getFormContainerQuery
