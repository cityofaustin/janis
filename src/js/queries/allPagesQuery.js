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
          }
        }
        janisbasepagewithtopics {
          guidepage {
            id
          }
          servicepage {
            id
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
