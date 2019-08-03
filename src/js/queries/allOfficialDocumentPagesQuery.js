const allOfficialDocumentPagesQuery = `
  query allOfficialDocumentPages {
    allOfficialDocumentPages(live:true){
      edges {
        node {
          id
          title
          slug
          description
          topics {
            edges {
              node {
                topic {
                  id,
                  slug,
                  title,
                  description,
                  topiccollections {
                    edges {
                      node {
                        topiccollection {
                          id
                          title
                          slug
                          theme {
                            id
                            slug
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
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
          officialDocuments(orderBy: "-date") {
            edges {
              node {
                id
                date
                title
                authoringOffice
                summary
                name
                link
              }
            }
          }
        }
      }
    }
  }
`;

export default allOfficialDocumentPagesQuery;
