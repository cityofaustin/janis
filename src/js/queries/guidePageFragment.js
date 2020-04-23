import phoneFragment from './phoneFragment';

const guidePageFragment = `
  fragment guidePageInfo on GuidePageNode {
    id
    title
    description
    slug
    contact {
      name
      email
      ${phoneFragment}
      socialMedia
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
          departments {
            id
            title
            slug
          }
        }
      }
    }
  }
`;

export default guidePageFragment;
