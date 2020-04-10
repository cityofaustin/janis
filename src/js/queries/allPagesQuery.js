import conciseContactFragment from './conciseContactFragment';
import departmentPageFragment from './departmentPageFragment';

const siteStructureQuery = `
query allPagesQuery {
  allPages(live:true) {
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
          ...departmentPageInfo
        }
        topiccollectionpage {
          id
          slug
          title
          description
          theme {
            id
            text
            slug
          }
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
            title
            slug
            description
            departments {
              id
              title
              slug
            }
          }
          formcontainer {
            id
          }
        }
      }
    }
  }
}  ${conciseContactFragment, departmentPageFragment}
`;
