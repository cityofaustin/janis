import React from 'react';

import SectionHeader from 'components/SectionHeader';
import ArrowRight from 'components/SVGs/ArrowRight';
import ListSVG from 'components/SVGs/List';

export default {
  title: 'SectionHeader',
};

export const sectionHeader = () => (
  <div className="wrapper container-fluid">
    <SectionHeader>Lorem ipsum dolor sit amet cume</SectionHeader>
  </div>
);

sectionHeader.story = {
  name: 'SectionHeader',
};

export const sectionHeaderHighlight = () => (
  <div className="wrapper container-fluid">
    <SectionHeader hasHighlight={true}>Lorem ipsum dolor sit amet cume</SectionHeader>
  </div>
);

sectionHeaderHighlight.story = {
  name: 'SectionHeader highlight',
};

export const sectionHeaderLink = () => (
  <div className="wrapper container-fluid">
    <SectionHeader hasHighlight={true}>
      <a href="#">
        Lorem ipsum dolor sit amet cume&nbsp;
        <ArrowRight />
      </a>
    </SectionHeader>
  </div>
);

sectionHeaderLink.story = {
  name: 'SectionHeader link',
};

export const sectionHeaderSymbol = () => (
  <div className="wrapper container-fluid">
    <SectionHeader symbol={<ListSVG />}>Lorem ipsum dolor sit amet cume</SectionHeader>
  </div>
);

sectionHeaderSymbol.story = {
  name: 'SectionHeader symbol',
};

export const sectionHeaderWithDescription = () => (
  <div className="wrapper container-fluid">
    <SectionHeader description="The City of Austin provides hundreds of services to residents to help them manage things like recycling, trash, energy, and water. This is a short list of services that will grow over time.">
      Lorem ipsum dolor sit amet cume
    </SectionHeader>
  </div>
);

sectionHeaderWithDescription.story = {
  name: 'SectionHeader with description',
};

export const sectionHeaderSerif = () => (
  <div className="wrapper container-fluid">
    <SectionHeader isSerif={true}>Lorem ipsum dolor sit amet cume</SectionHeader>
  </div>
);

sectionHeaderSerif.story = {
  name: 'SectionHeader serif',
};
