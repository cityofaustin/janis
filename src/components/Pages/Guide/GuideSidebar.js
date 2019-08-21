import React, { Component } from 'react';
import classNames from 'classnames';
import {hyphenate} from "./helpers";

class GuideSidebarLink extends Component {
  constructor(props) {
    super(props);
    this.goToSection = this.goToSection.bind(this);
  }

  goToSection(e) {
    e.preventDefault();
    window.location.href = this.props.anchorTag;
  }

  render() {
    const {title, isHeading} = this.props;
    return (
      <div
        className={classNames("coa-GuideSidebar__link", {
          'coa-GuideSidebar__heading': isHeading,
          'coa-GuideSidebar__subheading': !isHeading,
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
    const { section } = this.props;
    const tagPrefix = hyphenate(section.heading);
    const headingAnchorTag = `#${tagPrefix}`;
    const subHeadings = section.pages.map((page, index) => {
      const title = (
        (page.servicePage && page.servicePage.title) ||
        (page.informationPage && page.informationPage.title)
      );
      const anchorTag = `#${tagPrefix}-${index+1}`;
      return {
        title,
        anchorTag
      }
    });


    // <a href={headingAnchorTag} className="coa-GuideSidebar__section-heading">
    //   {section.heading}
    // </a>

    // <a href={subHeading.anchorTag} className="coa-GuideSidebar__section-subheading">
    //   {subHeading.title}
    // </a>

    return (
      <div className="coa-GuideSidebar__section">
        <GuideSidebarLink
          title={section.heading}
          anchorTag={headingAnchorTag}
          isHeading={true}
        />
        <div>
          {subHeadings.map((subHeading, index) => (
            <GuideSidebarLink
              title={subHeading.title}
              anchorTag={subHeading.anchorTag}
              isHeading={false}
            />
          ))}
        </div>
      </div>
    )
  }
}


class GuideSidebar extends Component {
  render() {
    let { sections } = this.props;

    return (
      <div className="coa-GuidePage__sidebar sticky">
        {sections.map((section, index) => (
          <GuideSidebarSection
            section={section}
            key={index}
          />
        ))}
      </div>
    )
  }
}

export default GuideSidebar;
