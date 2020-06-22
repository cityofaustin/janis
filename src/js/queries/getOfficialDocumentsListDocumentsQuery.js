const getOfficialDocumentsListDocumentsQuery = `
  query getOfficialDocumentsListDocumentsQuery($id: ID) {
    officialDocumentListDocuments(officialDocumentList: $id) {
      edges {
        node {
          documentPages(orderBy: "-date") {
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
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

export default getOfficialDocumentsListDocumentsQuery;

    