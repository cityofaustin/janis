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
              id
              label
              fieldType
              choices
              defaultValue
              helpText
              page {
                id
              }
              sortOrder
            }
          }
        }
      }
    }
  }
}
`;

export default allFormPagesQuery;
