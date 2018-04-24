import React from 'react';
import { storiesOf } from '@storybook/react';

import SectionHeader from 'components/SectionHeader/SectionHeader';
import ArrowRight from 'js/svg/ArrowRight';

storiesOf('SectionHeader', module)
  .add('SectionHeader', () => (
    <div className="wrapper container-fluid">
      <SectionHeader>Lorem ipsum dolor sit amet cume</SectionHeader>
    </div>
  ))
  .add('SectionHeader highlight', () => (
    <div className="wrapper container-fluid">
      <SectionHeader hasHighlight={true}>Lorem ipsum dolor sit amet cume</SectionHeader>
    </div>
  ))
  .add('SectionHeader link', () => (
    <div className="wrapper container-fluid">
      <SectionHeader hasHighlight={true}><a href="#">Lorem ipsum dolor sit amet cume&nbsp;<ArrowRight /></a></SectionHeader>
    </div>
  ))
  .add('SectionHeader serif', () => (
    <div className="wrapper container-fluid">
      <SectionHeader isSerif={true}>Lorem ipsum dolor sit amet cume</SectionHeader>
    </div>
  ))
