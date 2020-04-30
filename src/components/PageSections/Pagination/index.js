import React from 'react';

export const PageNumber = ({ pageNumber, index, changePage, paginationIndex, pageNumberIndex, contentType }) => {

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
      className={ `coa-${contentType}_page number-container` + active + ellipsis }
    >
      <div className={ `coa-${contentType}_number` }>
        { index }
      </div>
    </div>
  )
}
