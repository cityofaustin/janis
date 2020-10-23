import React from 'react';
import classNames from 'classnames';

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
  pagesCount,
  changePage
}) => {
  const hasPreviousPages = (pageNumber-1) >= 1
  const hasNextPages = (pageNumber+1) <= pagesCount

  return pageSelectorValues.length ? (
    <div className="coa-PageSelector_container">
      <div
        onClick={() => hasPreviousPages && changePage(pageNumber - 1)}
        className="coa-PageSelector_page previous"
      >
        <ChevronLeftBlue className="coa-PageSelector_page-chevron" />
      </div>

      {pageSelectorValues.map((pageSelectorValue, i) => (
        <PageNumber
          key={i}
          pageSelectorValue={pageSelectorValue}
          active={pageNumber === pageSelectorValue["pageNumberValue"]}
          changePage={changePage}
        />
      ))}

      <div
        onClick={() => hasNextPages && changePage(pageNumber + 1)}
        className="coa-PageSelector_page next"
      >
        <ChevronRightBlue className="coa-PageSelector_page-chevron right" />
      </div>
    </div>
  ) : null
}

const PageNumber = ({ pageSelectorValue, active, changePage }) => {
  return (
    <div
      onClick={()=>changePage(pageSelectorValue["pageNumberValue"])}
      className={classNames(`coa-PageSelector_page number-container`, {
        "ellipsis": pageSelectorValue["pageNumberDisplayed"] === "...",
        "active": active,
      })}
    >
      <div className={ `coa-PageSelector_number` }>
        { pageSelectorValue["pageNumberDisplayed"] }
      </div>
    </div>
  )
}

export default PageSelector;
