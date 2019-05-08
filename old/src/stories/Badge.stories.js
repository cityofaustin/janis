import React from 'react';
import { storiesOf } from '@storybook/react';
import Badge from 'components/Badges/Badge';
import BadgeGroup from 'components/Badges/BadgeGroup';
import ListSVG from 'components/SVGs/List';

const badges = [
  {
    text: 'Overview',
    url: '#',
  },
  {
    text: 'Badge Title One',
    symbol: 1,
    url: '#',
  },
  {
    text: 'Badge Title Two',
    symbol: 2,
    url: '#',
  },
  {
    text: 'Badge Title Three',
    symbol: 3,
    url: '#',
  },
  {
    text: 'Badge Title Four',
    symbol: 4,
    url: '#',
  },
];

storiesOf('Badges', module)
  .add('Badge', () => (
    <div className="wrapper container-fluid">
      <Badge text="Badge Title" />
    </div>
  ))
  .add('Badge active', () => (
    <div className="wrapper container-fluid">
      <Badge text="Badge Title" isActive={true} />
    </div>
  ))
  .add('Badge with url', () => (
    <div className="wrapper container-fluid">
      <Badge text="Badge Title" url="#" />
    </div>
  ))
  .add('Badge with symbol', () => (
    <div className="wrapper container-fluid">
      <Badge text="Badge Title" symbol={<ListSVG />} />
    </div>
  ))
  .add('Badge active with symbol', () => (
    <div className="wrapper container-fluid">
      <Badge text="Badge Title" symbol={<ListSVG />} isActive={true} />
    </div>
  ))
  .add('Badge Group', () => (
    <div className="wrapper container-fluid">
      <BadgeGroup badges={badges} activeIndex={0} />
    </div>
  ));
