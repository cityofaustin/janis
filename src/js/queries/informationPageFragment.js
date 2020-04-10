import phoneFragment from './phoneFragment';

const informationPageFragment = `
  fragment informationPageInfo on InformationPageNode {
    id
    title
    slug
    coaGlobal
    departments {
      id
      title
      slug
    }
    description
    additionalContent
    contact {
      name
      email
      ${phoneFragment}
      locationPage {
        title
      }
    }
  }
`;

export default informationPageFragment;

/*
import phoneFragment from './phoneFragment';

const informationPageFragment = `
  fragment informationPageInfo on InformationPageNode {
    id
    title
    slug
    coaGlobal
    departments {
      id
      title
      slug
    }
    topics {
      edges {
        node {
          topic {
            id,
            slug,
            title,
            description,
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
    description
    additionalContent
    contact {
      name
      email
      ${phoneFragment}
    }
  }
`;

export default informationPageFragment; */
