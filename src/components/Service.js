import React, { Component } from 'react';

class Service extends Component {

  render() {
    return (
      <div>Hi Service {this.props.match.params.id}</div>
    );
  }

}

export default Service;
