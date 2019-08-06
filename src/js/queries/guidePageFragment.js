const guidePageFragment = `
  fragment guidePageInfo on GuidePageNode {
    id
    title
    description
    sections {
      heading
      pages {
        servicePage {
          title
          shortDescription
          additionalContent
          steps
        }
        informationPage {
          title
          description
          additionalContent
        }
      }
    }
  }
`;

export default guidePageFragment;
