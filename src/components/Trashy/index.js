import React, { Component } from 'react';
import TrashySchedule from 'components/Trashy/TrashySchedule';
import TrashyAddress from 'components/Trashy/TrashyAddress';

const addressSuggestions = [
  { displayName: '1702 Taylor Gaines St Unit B, Austin', parcelId: '39514805' },
  { displayName: '1702 Taylor Gaines St, Austin', parcelId: '28855442' },
];

class Trashy extends Component {
  state = {
    addressText: '',
    parcelId: null,
  };

  setEnteredText = text => {
    this.setState({ addressText: text });
  };

  setParcelId = id => {
    this.setState({ parcelId: id });
  };

  render() {
    const { intl, options } = this.props;
    return (
      <div className="coa-Trashy">
        <TrashyAddress
          suggestions={addressSuggestions}
          setParcelId={this.setParcelId}
          setEnteredText={this.setEnteredText}
        />
        <div>
          {this.state.addressText}, {this.state.parcelId}
        </div>
        <TrashySchedule />
      </div>
    );
  }
}

export default Trashy;
