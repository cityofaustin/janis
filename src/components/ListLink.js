import React, { Component } from 'react';

class ListLink extends Component {
  render () {
    return (
      <a
        className={ this.props.isBoxType ? "coa-list_link coa-list_link--box" : "coa-list_link" }
        key={this.props.id}
        href={this.props.url}
      >
        <span>{this.props.text}</span>
        <i className="fa fa-chevron-right" aria-hidden="true"></i>
      </a>
    );
  }
}

export default ListLink;
