import React, { Component } from 'react';

class SectionTitle extends Component {

  render() {

    const { title, noBorder } = this.props;

    return (
      <div className={ `coa-section__title ${(noBorder && "coa-section__title--noborder" )}` }>
        <h3>{title}</h3>
      </div>
    );
  }
}

export default SectionTitle;
