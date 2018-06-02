import React, { Component } from 'react';
import TrashySchedule from 'components/Trashy/TrashySchedule';
import TrashyAddress from 'components/Trashy/TrashyAddress';

const addressSuggestions = [
  { displayName: '1702 Taylor Gaines St Unit B, Austin', parcelId: '39514805' },
  { displayName: '1702 Taylor Gaines St, Austin', parcelId: '28855442' },
];

class Trashy extends Component {
  state = {
    parcelId: null,
  };

  setParcelId = id => {
    this.setState({ parcelId: id });
  };

  render() {
    const { intl, options } = this.props;
    return (
      <div>
        <div>TODO: Implement the Recycling Schedule component.</div>
        <TrashySchedule />
        <div>{this.state.parcelId}</div>
        <TrashyAddress
          suggestions={addressSuggestions}
          setParcelId={this.setParcelId}
        />
      </div>
    );
  }
}

export default Trashy;
