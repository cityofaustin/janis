import React from 'react';
import { useRouteData, Head } from 'react-static';

import { useIntl } from 'react-intl';
import { events as i18n } from 'js/i18n/definitions';

// const SearchPage = ({ searchPage }) => {
const SearchPage = ( dummy ) => {

  const intl = useIntl();
  const { search } = useRouteData();

  console.log(dummy)
  // const {
  //   SearchPage: {
  //     title,
  //   },
  // } = searchPage ? { searchPage } : useRouteData();

  console.log('\n\n🔥🔥🔥ok we are in!🔥🔥🔥\n\n')
  const title = "🕵️‍♂️OH HI SEARCH PAGE!!!!🔍"

  return (
    <div>
      SOMETHING HERE????
      {title}
      <Head>
        <title>{title}</title>
      </Head>
    </div>
  )
}


export default SearchPage
