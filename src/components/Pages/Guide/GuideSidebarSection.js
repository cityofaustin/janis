import React, { Component } from 'react';

class GuideSidebar extends Component {
  render() {
    let { section } = this.props;

    console.log("~~~~ hi")
    console.log(JSON.stringify(sections, null, 2))

    return (
      <div>
        <h3>{section.heading}</h3>

        {section.map((page, index) => (
          <GuideSidebarSection
            section={section}
          />
        ))}
      </div>
    )
  }
}

export default GuideSidebar;
