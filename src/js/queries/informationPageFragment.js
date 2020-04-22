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
