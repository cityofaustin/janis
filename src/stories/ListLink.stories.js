import React from 'react';

import ListLink from 'components/ListLink';

export default {
  title: 'ListLink',
};

export const lightThemeDefault = () => (
  <div className="wrapper container-fluid">
    <ListLink url={'https://austintexas.gov'} text={'Current City of Austin website'} />
  </div>
);

lightThemeDefault.story = {
  name: 'light theme (default)',
};

export const darkTheme = () => (
  <div className="coa-ThreeOneOne wrapper container-fluid">
    <ListLink url={'https://austintexas.gov'} text={'Current City of Austin website'} />
  </div>
);

darkTheme.story = {
  name: 'dark theme',
};
