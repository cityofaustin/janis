import React, { Component } from 'react';
import TrashySchedule from 'components/Trashy/TrashySchedule';
import TrashyAddress from 'components/Trashy/TrashyAddress';

const addressSuggestions = [
  { displayName: '1702 Taylor Gaines St Unit B, Austin', parcelId: '39514805' },
  { displayName: '1702 Taylor Gaines St, Austin', parcelId: '28855442' },
];

const address = '1000 Congress Ave, Austin, TX';
const nextBulkPickupDate = new Date().toString();
const pickupDates = [
  {
    date: 'june 1',
    services: ['Trash', 'Recycling'],
  },
  {
    date: 'june 2',
    services: ['textiles', 'Compost'],
  },
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
        <TrashySchedule
          address={address}
          pickupDates={pickupDates}
          nextBulkPickupDate={nextBulkPickupDate}
        />
      </div>
    );
  }
}

export default Trashy;
