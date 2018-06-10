import React from 'react';
import { storiesOf } from '@storybook/react';
import Badge from 'components/Badge';

storiesOf('Badge', module)
  .add('Badge', () => (
    <div className="wrapper container-fluid">
      <Badge title="Badge Title"/>
    </div>
  ))
  .add('Badge active', () => (
    <div className="wrapper container-fluid">
      <Badge title="Badge Title" isActive={true}/>
    </div>
  ))
  .add('Badge with step', () => (
    <div className="wrapper container-fluid">
      <Badge title="Badge Title" step={1}/>
    </div>
  ))
  .add('Badge active with step', () => (
    <div className="wrapper container-fluid">
      <Badge title="Badge Title" step={1} isActive={true}/>
    </div>
  ));
