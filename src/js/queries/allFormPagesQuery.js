const allFormPagesQuery = `
{
  allFormPages {
    edges {
      node {
        id
        title
        slug
        toAddress
        fromAddress
        urlPath
        formFields {
          edges {
            node {
              sortOrder
              id
              label
              fieldType
              required
              choices
              defaultValue
              helpText
              page {
                id
              }
            }
          }
        }
      }
    }
  }
}
`;

export default allFormPagesQuery;
