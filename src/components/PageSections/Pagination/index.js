
export const PageNumber = ({ pageNumber, index, changePage, paginationIndex, pageNumberIndex })=>{
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
      className={ "coa-EventListPage_page number-container" + active + ellipsis }
    >
      <div className={ "coa-EventListPage_number" }>
        { index }
      </div>
    </div>
  )
}