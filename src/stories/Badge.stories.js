import React from 'react';
import { storiesOf } from '@storybook/react';
import Badge from 'components/Badges/Badge';
import BadgeGroup from 'components/Badges/BadgeGroup';
import ListSVG from 'components/SVGs/List';

const badges = [
  {
    title: 'Overview',
    isActive: true,
  },
  {
    title: 'Badge Title One',
    symbol: 1,
  },
  {
    title: 'Badge Title Two',
    symbol: 2,
  },
  {
    title: 'Badge Title Three',
    symbol: 3,
  },
  {
    title: 'Badge Title Four',
    symbol: 4,
  },
];

storiesOf('Badges', module)
  .add('Badge', () => (
    <div className="wrapper container-fluid">
      <Badge title="Badge Title" />
    </div>
  ))
  .add('Badge active', () => (
    <div className="wrapper container-fluid">
      <Badge title="Badge Title" isActive={true} />
    </div>
  ))
  .add('Badge with symbol', () => (
    <div className="wrapper container-fluid">
      <Badge title="Badge Title" symbol={<ListSVG />} />
    </div>
  ))
  .add('Badge active with symbol', () => (
    <div className="wrapper container-fluid">
      <Badge title="Badge Title" symbol={<ListSVG />} isActive={true} />
    </div>
  ))
  .add('Badge Group', () => (
    <div className="wrapper container-fluid">
      <BadgeGroup badges={badges} />
    </div>
  ));
