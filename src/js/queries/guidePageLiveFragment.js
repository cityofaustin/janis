// fragment for the allPagesQuery. 
// the other guide page fragment is for preview

const guidePageLiveFragment = `
  fragment guidePageLiveInfo on GuidePageNode {
    id
    title
    description
    slug
    contacts {
      edges {
        node {
          contact {
            name
            email
            phoneNumber {
              edges {
                node {
                  id
                  phoneDescription
                  phoneNumber
                }
              }
            }
            socialMedia
            hours {
              edges {
                node {
                  dayOfWeek
                  startTime
                  endTime
                }
              }
            }
            location {
              name
              street
              city
              state
              zip
              country
            }
          }
        }
      }
    }
    image {
      id
      filename
      title
    }
    departments {
      id
      title
      slug
    }
    sections {
      heading
      pages {
        url
        servicePage {
          title
          shortDescription
          additionalContent
          steps
          slug
        }
        informationPage {
          title
          description
          additionalContent
          slug
        }
      }
    }
  }
}
`;

export default guidePageLiveFragment;
