const officialDocumentPageFragment = `
  fragment officialDocumentPageInfo on OfficialDocumentPageNode {
    id
    title
    date
    title
    authoringOffice
    summary
    name
    body
    document {
      fileSize
      filename
      url
    }
    departments {
      id
      title
      slug
    }
    officialDocumentCollection {
      edges {
        node {
          officialDocumentCollection {
            title
            slug
            departments {
              slug
            }
          }
        }
      }
    }
  }
`;

export default officialDocumentPageFragment;
