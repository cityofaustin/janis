import React, { Component } from 'react';

class GuideSidebarSection extends Component {
  render() {
    let { section } = this.props;

    const subHeadings = section.pages.map((page, index) => {
      const title = (
        (page.servicePage && page.servicePage.title) ||
        (page.informationPage && page.informationPage.title)
      );
      const anchorTag = `#${section.heading}-${index+1}`;
      return {
        title,
        anchorTag
      }
    });

    const headingAnchorTag = `#${section.heading}`;


    return (
      <div className="coa-GuideSidebar__section">
        <a href={headingAnchorTag} className="coa-GuideSidebar__section-heading">
          {section.heading}
        </a>
        <div>
          {subHeadings.map((subHeading, index) => (
            <div>
              <a href={subHeading.anchorTag} className="coa-GuideSidebar__section-subheading">
                {subHeading.title}
              </a>
            </div>
          ))}
        </div>
      </div>
    )
  }
}


class GuideSidebar extends Component {
  render() {
    let { sections } = this.props;

    console.log("~~~~ hi")
    console.log(JSON.stringify(sections, null, 2))

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
