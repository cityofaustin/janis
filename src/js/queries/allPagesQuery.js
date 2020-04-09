const siteStructureQuery = `
query allPagesQuery {
  allPages {
    edges {
      node {
        janisUrls
        janisInstances{
          url
          parent{
            url
            title
          }
          grandparent {
            url
            title
          }
        }
        eventpage {
          id
        }
        locationpage {
          id
        }
        departmentpage {
          id
        }
        topiccollectionpage {
          id
        }
        janisbasepagewithtopiccollections {
          topicpage {
            id
            topiccollections {
              id
            }
          }
        }
        janisbasepagewithtopics {
          guidepage {
            id
          }
          servicepage {
            id
            departments {
              id
              title
              slug
            }
            janisUrl
            id
            title
            coaGlobal
            departments {
              id
              title
              slug
            }
            steps
            dynamicContent
            additionalContent
            shortDescription
            contact {
              id
            }
          }
          informationpage {
            id
          }
          officialdocumentpage {
            id
          }
          formcontainer {
            id
          }
        }
      }
    }
  }
}
`;

export default siteStructureQuery;
