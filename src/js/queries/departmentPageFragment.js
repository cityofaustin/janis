import phoneFragment from './phoneFragment';

const departmentPageFragment = `
  fragment departmentPageInfo on DepartmentPageNode {
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
          id
          sortOrder
          servicePage {
            id
            title
            slug
            relatedDepartments {
              edges {
                node {
                  relatedDepartment {
                    slug
                  }
                }
              }
            }
            topics {
              edges {
                node {
                  topic {
                    slug
                    topiccollections {
                      edges {
                        node {
                          topiccollection {
                            slug
                            theme {
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
          informationPage {
            id
            title
            slug
            relatedDepartments {
              edges {
                node {
                  relatedDepartment {
                    slug
                  }
                }
              }
            }
            topics {
              edges {
                node {
                  topic {
                    slug
                    topiccollections {
                      edges {
                        node {
                          topiccollection {
                            slug
                            theme {
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
          guidePage {
            id
            title
            slug
            relatedDepartments {
              edges {
                node {
                  relatedDepartment {
                    slug
                  }
                }
              }
            }
            topics {
              edges {
                node {
                  topic {
                    slug
                    topiccollections {
                      edges {
                        node {
                          topiccollection {
                            slug
                            theme {
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
          officialDocumentPage {
            id
            title
            slug
            relatedDepartments {
              edges {
                node {
                  relatedDepartment {
                    slug
                  }
                }
              }
            }
            topics {
              edges {
                node {
                  topic {
                    slug
                    topiccollections {
                      edges {
                        node {
                          topiccollection {
                            slug
                            theme {
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
    relatedPages {
      edges {
        node {
          id
          sortOrder
          servicePage {
            id
            title
            slug
            relatedDepartments {
              edges {
                node {
                  relatedDepartment {
                    slug
                  }
                }
              }
            }
            topics {
              edges {
                node {
                  topic {
                    slug
                    topiccollections {
                      edges {
                        node {
                          topiccollection {
                            slug
                            theme {
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
          informationPage {
            id
            title
            slug
            relatedDepartments {
              edges {
                node {
                  relatedDepartment {
                    slug
                  }
                }
              }
            }
            topics {
              edges {
                node {
                  topic {
                    slug
                    topiccollections {
                      edges {
                        node {
                          topiccollection {
                            slug
                            theme {
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
          guidePage {
            id
            title
            slug
            relatedDepartments {
              edges {
                node {
                  relatedDepartment {
                    slug
                  }
                }
              }
            }
            topics {
              edges {
                node {
                  topic {
                    slug
                    topiccollections {
                      edges {
                        node {
                          topiccollection {
                            slug
                            theme {
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
          officialDocumentPage {
            id
            title
            slug
            relatedDepartments {
              edges {
                node {
                  relatedDepartment {
                    slug
                  }
                }
              }
            }
            topics {
              edges {
                node {
                  topic {
                    slug
                    topiccollections {
                      edges {
                        node {
                          topiccollection {
                            slug
                            theme {
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
    contacts {
      edges {
        node {
          contact {
            name
            ${phoneFragment}
            email
            socialMedia
            location {
              id
              name
              street
              city
              state
              country
              zip
            }
            hours {
              edges {
                node {
                  dayOfWeek
                  startTime
                  endTime
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default departmentPageFragment;
