const documentPageFragment = `
  fragment documentPageInfo on OfficialDocumentPageNode {
    id
    title
    slug
    description
    departments {
      id
      title
      slug
    }
    documents(orderBy: "-date") {
      edges {
        node {
          id
          date
          title
          authoringOffice
          summary
          name
          document {
            fileSize
            filename
            url
          }
        }
      }
    }
  }
`;

export default documentPageFragment;
