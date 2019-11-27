import React from 'react';
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

export default {
  title: 'Badges',
};

export const badge = () => (
  <div className="wrapper container-fluid">
    <Badge text="Badge Title" />
  </div>
);

export const badgeActive = () => (
  <div className="wrapper container-fluid">
    <Badge text="Badge Title" isActive={true} />
  </div>
);

badgeActive.story = {
  name: 'Badge active',
};

export const badgeWithUrl = () => (
  <div className="wrapper container-fluid">
    <Badge text="Badge Title" url="#" />
  </div>
);

badgeWithUrl.story = {
  name: 'Badge with url',
};

export const badgeWithSymbol = () => (
  <div className="wrapper container-fluid">
    <Badge text="Badge Title" symbol={<ListSVG />} />
  </div>
);

badgeWithSymbol.story = {
  name: 'Badge with symbol',
};

export const badgeActiveWithSymbol = () => (
  <div className="wrapper container-fluid">
    <Badge text="Badge Title" symbol={<ListSVG />} isActive={true} />
  </div>
);

badgeActiveWithSymbol.story = {
  name: 'Badge active with symbol',
};

export const badgeGroup = () => (
  <div className="wrapper container-fluid">
    <BadgeGroup badges={badges} activeIndex={0} />
  </div>
);
