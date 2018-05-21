import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { injectIntl } from 'react-intl';

import Menu from 'components/PageSections/Menu';
import navigationData from 'stories/static_data/navigationData';

const IntlMenu = injectIntl(({ intl }) => (
  <Menu
    isMenuOpen={true}
    closeMenu={linkTo('Menu', 'Menu closed')}
    navigation={navigationData[intl.locale]}
  />
));

storiesOf('Menu', module).add('Menu open', () => <IntlMenu />);
