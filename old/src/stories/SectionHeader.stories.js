import React from 'react';
import { storiesOf } from '@storybook/react';

import SectionHeader from 'components/SectionHeader';
import ArrowRight from 'components/SVGs/ArrowRight';
import ListSVG from 'components/SVGs/List';

storiesOf('SectionHeader', module)
  .add('SectionHeader', () => (
    <div className="wrapper container-fluid">
      <SectionHeader>Lorem ipsum dolor sit amet cume</SectionHeader>
    </div>
  ))
  .add('SectionHeader highlight', () => (
    <div className="wrapper container-fluid">
      <SectionHeader hasHighlight={true}>
        Lorem ipsum dolor sit amet cume
      </SectionHeader>
    </div>
  ))
  .add('SectionHeader link', () => (
    <div className="wrapper container-fluid">
      <SectionHeader hasHighlight={true}>
        <a href="#">
          Lorem ipsum dolor sit amet cume&nbsp;<ArrowRight />
        </a>
      </SectionHeader>
    </div>
  ))
  .add('SectionHeader symbol', () => (
    <div className="wrapper container-fluid">
      <SectionHeader symbol={<ListSVG />}>
        Lorem ipsum dolor sit amet cume
      </SectionHeader>
    </div>
  ))
  .add('SectionHeader with description', () => (
    <div className="wrapper container-fluid">
      <SectionHeader description="The City of Austin provides hundreds of services to residents to help them manage things like recycling, trash, energy, and water. This is a short list of services that will grow over time.">
        Lorem ipsum dolor sit amet cume
      </SectionHeader>
    </div>
  ))
  .add('SectionHeader serif', () => (
    <div className="wrapper container-fluid">
      <SectionHeader isSerif={true}>
        Lorem ipsum dolor sit amet cume
      </SectionHeader>
    </div>
  ));
