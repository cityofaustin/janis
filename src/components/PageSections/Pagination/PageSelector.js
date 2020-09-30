import React from 'react';

import ChevronLeftBlue from 'components/SVGs/ChevronLeftBlue';
import ChevronRightBlue from 'components/SVGs/ChevronRightBlue';

/**
  The PageNavigator contains the buttons that allow users to navigate to multiple pagination pages.
  @param pageSelectorValues (String[]): array of possible pages to navigate to
  @param pageNumber (String): the current pageNumber that the PaginationContainer is set to.
  @param changePage (Function): handles page change logic
**/
const PageSelector = ({
  pageSelectorValues,
  pageNumber,
  changePage
}) => {
  return pageSelectorValues.length ? (
    <div className="coa-PageSelector_container">
      <div
        onClick={() => changePage(pageNumber - 1)}
        className="coa-PageSelector_page previous"
      >
        <ChevronLeftBlue className="coa-PageSelector_page-chevron" />
      </div>

      {pageSelectorValues.map((page, i) => (
        <PageNumber
          pageNumber={pageNumber + 1}
          index={pageSelectorValues[i]}
          paginationIndex={i}
          key={i}
          pageNumberIndex={pageSelectorValues.indexOf(pageNumber + 1)}
          changePage={changePage}
        />
      ))}

      <div
        onClick={() => changePage(pageNumber + 1)}
        className="coa-PageSelector_page next"
      >
        <ChevronRightBlue className="coa-PageSelector_page-chevron right" />
      </div>
    </div>
  ) : null
}

const PageNumber = ({ pageNumber, index, changePage, paginationIndex, pageNumberIndex }) => {
  const active = pageNumber === index ? " active" : ''
  let ellipsis = ""
  let pageIndex = index
  if (index === "...") {
    ellipsis = " ellipsis"
    pageIndex = pageNumberIndex > paginationIndex ? pageNumber-1 : pageNumber+1
  }
  return (
    <div
      onClick={()=>changePage(pageIndex-1)}
      className={ `coa-PageSelector_page number-container` + active + ellipsis }
    >
      <div className={ `coa-PageSelector_number` }>
        { index }
      </div>
    </div>
  )
}

export default PageSelector;
