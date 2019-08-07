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
            phone
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
    relatedDepartments {
      edges {
        node {
          relatedDepartment {
            id
            title
            slug
          }
        }
      }
    }
    topics {
      edges {
        node {
          toplink
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
                toplink
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
          relatedDepartments {
            edges {
              node {
                relatedDepartment {
                  id
                  title
                  slug
                }
              }
            }
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
                toplink
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
          relatedDepartments {
            edges {
              node {
                relatedDepartment {
                  id
                  title
                  slug
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
