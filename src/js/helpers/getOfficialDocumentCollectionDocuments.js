import filesize from 'filesize';
import getOfficialDocumentsCollectionDocumentsQuery from 'js/queries/getOfficialDocumentsCollectionDocumentsQuery';


// Get all Documents for an OfficialDocumentCollection
const getOfficialDocumentCollectionDocuments = async (officialDocumentCollectionId, client) => {
  let officialDocumentCollectionDocuments = []
  let after = '';
  while (true) {
    const res = await client.request(
      getOfficialDocumentsCollectionDocumentsQuery,
      {
        id: officialDocumentCollectionId,
        after: after,
      },
    );
    officialDocumentCollectionDocuments = officialDocumentCollectionDocuments.concat(res.officialDocumentCollectionDocuments.edges)
    after = res.officialDocumentCollectionDocuments.pageInfo.endCursor;
    if (!res.officialDocumentCollectionDocuments.pageInfo.hasNextPage) {
      break;
    }
  }

  let documentArray = [];

  if (
    officialDocumentCollectionDocuments.length
  ) {
    for (let doc of officialDocumentCollectionDocuments) {
      // If we have a document in wagtail
      // use that info to update the information syncronously
      if (doc.node.page.live && doc.node.page.document) { // if the page is draft form, do not add
        doc.node.page.link = doc.node.page.document.url;
        // If it's a pdf, add the size
        if (doc.node.page.document.filename.slice(-3) === 'pdf') {
          doc.node.page.pdfSize = filesize(doc.node.page.document.fileSize).replace(
            ' ',
            '',
          );
        }
        documentArray.push(doc.node.page);
      }
    }
  }

  return documentArray
}

export default getOfficialDocumentCollectionDocuments
