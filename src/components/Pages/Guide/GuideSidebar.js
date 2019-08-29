import React, { Component } from 'react';

import GuideSidebarMobile from 'components/Pages/Guide/GuideSidebarMobile';
import classNames from 'classnames';
import {hyphenate} from "./helpers";
import { isMobileOrTablet } from 'js/helpers/reactMediaQueries';

class GuideSidebarLink extends Component {
  constructor(props) {
    super(props);
    this.goToSection = this.goToSection.bind(this);
  }

  // Each GuideSectionWrapper has an id={this.props.anchorTag}
  goToSection(e) {
    e.preventDefault();
    window.location.href = `#${this.props.anchorTag}`;
  }

  render() {
    const {title, isHeading, isCurrentSection} = this.props;

    return (
      <div
        className={classNames("coa-GuideSidebar__link", {
          'coa-GuideSidebar__heading': isHeading,
          'coa-GuideSidebar__subheading': !isHeading,
          'coa-GuideSidebar__current-section': isCurrentSection,
        })}
        onClick={this.goToSection}
      >
        {title}
      </div>
    )
  }
}

class GuideSidebarSection extends Component {
  render() {
    const { section, currentSection } = this.props;
    const headingAnchorTag = hyphenate(section.heading);
    const subHeadings = section.pages.map((page, index) => {
      const title = (
        (page.servicePage && page.servicePage.title) ||
        (page.informationPage && page.informationPage.title)
      );
      const anchorTag = `${headingAnchorTag}-${index+1}`;
      return {
        title,
        anchorTag
      }
    });

    return (
      <div className="coa-GuideSidebar__section">
        <GuideSidebarLink
          title={section.heading}
          anchorTag={headingAnchorTag}
          isHeading={true}
          isCurrentSection={currentSection === headingAnchorTag}
        />
        {subHeadings.map((subHeading, index) => (
          <GuideSidebarLink
            title={subHeading.title}
            anchorTag={subHeading.anchorTag}
            isHeading={false}
            isCurrentSection={currentSection === subHeading.anchorTag}
          />
        ))}
      </div>
    )
  }
}

function GuideSidebarDesktop({ contact, sections, currentSection }) {
  return (
    <div className="coa-GuideSidebar__container sticky">
      <div className="coa-GuideSidebar__section">
        {contact && (
          <GuideSidebarLink
            title="Contact information"
            anchorTag="Contact-information"
            isHeading={true}
            isCurrentSection={currentSection === "Contact-information"}
          />
        )}
      </div>
      {sections.map((section, index) => (
        <GuideSidebarSection
          section={section}
          currentSection={currentSection}
          key={index}
        />
      ))}
    </div>
  )
}

function GuideSidebar({ title, contact, sections, currentSection }){
  if (isMobileOrTablet()) {
    return (
      <GuideSidebarMobile
        title={title}
        contact={contact}
        sections={sections}
        currentSection={currentSection}
      />
    )
  } else {
    return (
      <GuideSidebarDesktop
        contact={contact}
        sections={sections}
        currentSection={currentSection}
      />
    )
  }
}

export default GuideSidebar;
