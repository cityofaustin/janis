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
        formFields {
          edges {
            node {
              fieldType
              choices
            }
          }
        }
      }
    }
  }
}

`;

export default allFormPagesQuery;
