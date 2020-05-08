import conciseContactFragment from './conciseContactFragment';
import departmentPageFragment from './departmentPageFragment';
import informationPageFragment from './informationPageFragment';
import locationPageFragment from './locationPageFragment';
import eventPageFragment from './eventPageFragment';
import documentPageFragment from './documentPageFragment';
import guidePageLiveFragment from './guidePageLiveFragment';
import newsPageFragment from './newsPageFragment';

const siteStructureQuery = `
query allPagesQuery($after: String) {
  allPages(live: true, first: 20, after: $after) {
    edges {
      node {
        janisUrls
        janisInstances {
          url
          parent {
            url
            title
            id
          }
          grandparent {
            url
            title
            id
          }
          byDepartmeent {
            url
            title
            id
          }
          fromDepartment {
            id
            title
            url
          }
        }
        ...newsPageInfo
        eventpage {
          ...eventPageInfo
        }
        locationpage {
          ...locationPageInfo
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
            slug
            title
            description
            topPages {
              edges {
                node {
                  pageId
                  slug
                  title
                  pageType
                }
              }
            }
            topiccollections {
              id
            }
          }
        }
        janisbasepagewithtopics {
          guidepage {
            ...guidePageLiveInfo
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
            ...informationPageInfo
          }
          officialdocumentpage {
            ...documentPageInfo
          }
          formcontainer {
            id
            title
            slug
            description
            formUrl
            departments {
              id
              title
              slug
            }
          }
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}  ${conciseContactFragment}${informationPageFragment}${locationPageFragment}${eventPageFragment}${documentPageFragment}${departmentPageFragment}${guidePageLiveFragment}${newsPageFragment}
`;

export default siteStructureQuery;
