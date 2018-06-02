import React, { Component } from 'react';
import TrashySchedule from 'components/Trashy/TrashySchedule';
import TrashyAddress from 'components/Trashy/TrashyAddress';

const addressSuggestions = [
  { displayName: '1702 Taylor Gaines St Unit B, Austin', parcelId: '39514805' },
  { displayName: '1702 Taylor Gaines St, Austin', parcelId: '28855442' },
];

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
    address: null,
  };

  setEnteredText = text => {
    this.setState({ addressText: text });
  };

  setAddress = address => {
    this.setState({ address: address });
  };

  render() {
    const { intl, options } = this.props;
    return (
      <div className="coa-Trashy">
        <TrashyAddress
          suggestions={addressSuggestions}
          setAddress={this.setAddress}
          setEnteredText={this.setEnteredText}
        />
        <div>
          {this.state.addressText}
          {this.state.addressText && ','}
          {this.state.parcelId}
        </div>
        {this.state.address && (
          <TrashySchedule
            address={this.state.address.displayName}
            pickupDates={pickupDates}
            nextBulkPickupDate={nextBulkPickupDate}
          />
        )}
      </div>
    );
  }
}

export default Trashy;
