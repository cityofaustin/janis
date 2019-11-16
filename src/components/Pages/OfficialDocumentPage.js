import React from 'react';
import { injectIntl } from 'react-intl';

import OfficialDocument from 'components/Pages/OfficialDocument'

class OfficialDocumentPage extends React.Component {

  constructor(props){
    super()
    const documentsPerPage = 4
    this.state = {
      documentsPerPage: documentsPerPage,
      pageNumber: 0,
      officialDocumentPages: this.createPages(props.officialDocuments.edges, documentsPerPage)
    }
  }

  createPages(allDocs, documentsPerPage) {
    const pages = []
    for (var i = 0; i < allDocs.length; i += documentsPerPage) {
      pages.push(allDocs.slice(i, i + documentsPerPage))
    }
    console.log("pages :", pages)
    return pages
  }

  changePage(direction) {
    const newPage = this.state.pageNumber + direction
    if (newPage >= 0 && newPage <= this.state.officialDocumentPages.length - 1) {
      this.setState({ pageNumber: newPage })
    }
  }

  render() {

    const page = this.state.officialDocumentPages[this.state.pageNumber]

    return (
      <div>

        <nav className="coa-Nav_pagination">
          CurrentPage: {this.state.pageNumber + 1}
          <br/>
          Total Pages:
          <br/>
          <button onClick={()=>this.changePage(-1)}> ◀️ </button>
          ...
          <button onClick={()=>this.changePage(1)}> ▶️ </button>
        </nav>

        <div className="coa-Page__all-of-the-content">
          <div className="wrapper container-fluid">
            <div className="row">
              <div className="col-xs-12 col-md-8">
                {page && page.map((document, index) => (
                  <OfficialDocument document={document.node} key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )

  }

}
export default OfficialDocumentPage;
