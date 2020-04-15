import conciseContactFragment from './conciseContactFragment';
import departmentPageFragment from './departmentPageFragment';
import informationPageFragment from './informationPageFragment';
import locationPageFragment from './locationPageFragment';
import eventPageFragment from './eventPageFragment';
import documentPageFragment from './documentPageFragment';

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
        }
        eventpage {
          ...eventPageInfo
        }
        locationpage {
          ...locationPageInfo
        }
        departmentpage {
          id
          slug
          title
          whatWeDo
          image {
            id
            filename
            title
          }
          mission
          departmentDirectors {
            edges {
              node {
                name
                photo {
                  id
                  filename
                }
                about
                title
              }
            }
          }
          jobListings
          topPages {
            edges {
              node {
                pageId
                slug
                title
              }
            }
          }
          relatedPages {
            edges {
              node {
                pageId
                slug
                title
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
            # todo: figure out why we get a 'string indices must be integers' error when we uncomment
            # steps
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
}  ${conciseContactFragment}${informationPageFragment}${locationPageFragment}${eventPageFragment}${documentPageFragment}
`;

export default siteStructureQuery;

/*
import conciseContactFragment from './conciseContactFragment';
import departmentPageFragment from './departmentPageFragment';
import informationPageFragment from './informationPageFragment';
import locationPageFragment from './locationPageFragment';
import eventPageFragment from './eventPageFragment';

const siteStructureQuery = `
query allPagesQuery {
  allPages(live:true) {
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
        }
        eventpage {
          ...eventPageInfo
        }
        locationpage {
          ...locationPageInfo
        }
        departmentpage {
          id
          slug
          title
          whatWeDo
          image {
            id
            filename
            title
          }
          mission
          departmentDirectors {
            edges {
              node {
                name
                photo {
                  id
                  filename
                }
                about
                title
              }
            }
          }
          jobListings
          topPages {
            edges {
              node {
                pageId
                slug
                title
              }
            }
          }
          relatedPages {
            edges {
              node {
                pageId
                slug
                title
              }
            }
          }
          contact {
            ...contactInfo
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
            ...informationPageInfo
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
  }
}  ${conciseContactFragment}${informationPageFragment}${locationPageFragment}${eventPageFragment}
`;



export default siteStructureQuery;


*/
