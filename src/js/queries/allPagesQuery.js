const siteStructureQuery = `
query allPagesQuery {
  allPages {
    edges {
      node {
        janisUrls
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
