import React, { Component } from 'react';

class SectionSubtitle extends Component {

  render() {

    const { title } = this.props;

    return (
      <h4 className="coa-section__subtitle">{title}</h4>
    );
  }
}

export default SectionSubtitle;
