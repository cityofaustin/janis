import conciseContactFragment from './conciseContactFragment';
import departmentPageFragment from './departmentPageFragment';
import informationPageFragment from './informationPageFragment';
import locationPageFragment from './locationPageFragment';
import eventPageFragment from './eventPageFragment';
import guidePageLiveFragment from './guidePageLiveFragment';
import newsPageFragment from './newsPageFragment';

const siteStructureQuery = `
query allPagesQuery($after: String) {
  allPages(live: true, first: 10, after: $after) {
    edges {
      node {
        pageType
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
          fromDepartment {
            id
            title
            url
          }
          byDepartment {
            id
            title
            url
          }
        }
        newspage {
          ...newsPageInfo
        }
        eventpage {
          ...eventPageInfo
        }
        locationpage {
          ...locationPageInfo
        }
        departmentpage {
          ...departmentPageInfo
        }
        officialdocumentpage {
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
          departments {
            id
            title
            slug
          }
          officialDocumentCollection{
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
            events {
              id
              title
              slug
              date
              startTime
              endTime
              locations {
                additionalDetails
                locationType
                cityLocation {
                  id
                  title
                  physicalStreet
                  physicalCity
                  physicalState
                  physicalZip
                  physicalUnit
                  slug
                }
                remoteLocation {
                  name
                  street
                  city
                  state
                  zip
                  unit
                }
              }
              eventIsFree,
              registrationUrl,
              canceled,
              fees {
                edges {
                  node {
                    feeLabel
                    fee
                  }
                }
              }
            }
          }
          informationpage {
            ...informationPageInfo
          }
          officialdocumentcollection {
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
}  ${conciseContactFragment}${informationPageFragment}${locationPageFragment}${eventPageFragment}${departmentPageFragment}${guidePageLiveFragment}${newsPageFragment}
`;

export default siteStructureQuery;
