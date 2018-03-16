import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { Route, Link, MemoryRouter } from 'react-router-dom';

import Menu from 'js/page_sections/Menu';


storiesOf('Menu', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('open', () => <Menu isOpen={true} toggleMenu={linkTo('Menu' , 'closed')} />)
  .add('closed', () => <Menu isOpen={false} toggleMenu={linkTo('Menu', 'open')} />)
