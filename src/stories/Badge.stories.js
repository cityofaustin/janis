import React from 'react';
import { storiesOf } from '@storybook/react';
import Badge from 'components/Badges/Badge';
import BadgeGroup from 'components/Badges/BadgeGroup';

const badges = [
  {
    title: 'Overview',
    isActive: true,
  },
  {
    title: 'Badge Title One',
    step: 1,
  },
  {
    title: 'Badge Title Two',
    step: 2,
  },
  {
    title: 'Badge Title Three',
    step: 3,
  },
  {
    title: 'Badge Title Four',
    step: 4,
  },
];

storiesOf('Badges', module)
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
  ))
  .add('Badge Group', () => (
    <div className="wrapper container-fluid">
      <BadgeGroup badges={badges} />
    </div>
  ));
