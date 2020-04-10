import conciseContactFragment from './conciseContactFragment';

const siteStructureQuery = `
query allPagesQuery {
  allPages {
    edges {
      node {
        janisUrls
        janisInstances {
          url
          parent{
            url
            title
            id
          }
          grandparent {
            url
            title
            id
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
              ...contactInfo
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
}  ${conciseContactFragment}
`;

export default siteStructureQuery;
