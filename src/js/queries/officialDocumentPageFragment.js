const officialDocumentPageFragment = `
  fragment officialDocumentPageInfo on OfficialDocumentPageNode {
    id
    title
    date
    title
    authoringOffice
    summary
    name
    document {
      fileSize
      filename
      url
    }
  }
`;

export default officialDocumentPageFragment;
