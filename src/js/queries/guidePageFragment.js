import phoneFragment from './phoneFragment';

const guidePageFragment = `
  fragment guidePageInfo on GuidePageNode {
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
            ${phoneFragment}
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
    topics {
      edges {
        node {
          topic {
            id
            slug
            title
            description
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
    sections {
      heading
      pages {
        servicePage {
          title
          shortDescription
          additionalContent
          steps
          slug
          topics {
            edges {
              node {
                topic {
                  id
                  slug
                  title
                  description
                  topiccollections {
                    edges {
                      node {
                        topiccollection {
                          id
                          title
                          slug
                          theme {
                            id
                            text
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
          departments {
            id
            title
            slug
          }
        }
        informationPage {
          title
          description
          additionalContent
          slug
          topics {
            edges {
              node {
                topic {
                  id
                  slug
                  title
                  description
                  topiccollections {
                    edges {
                      node {
                        topiccollection {
                          id
                          title
                          slug
                          theme {
                            id
                            text
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
        }
      }
    }
  }
`;

export default guidePageFragment;
