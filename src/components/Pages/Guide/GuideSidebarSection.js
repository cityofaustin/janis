import React, { Component } from 'react';

class GuideSidebar extends Component {
  render() {
    let { section } = this.props;

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
