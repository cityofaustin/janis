import React, { Component } from 'react';
import axios from 'axios';

import TrashySchedule from 'components/Trashy/TrashySchedule';
import TrashyAddress from 'components/Trashy/TrashyAddress';

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
    address: null,
    addressSuggestions: [],
  };

  getAddressSuggestions = addressText => {
    axios
      .post('https://recollect-wrapper.herokuapp.com/api/suggest', {
        address: addressText,
      })
      .then(response => this.setState({ addressSuggestions: response.data }))
      .catch(error => console.log(error));
  };

  setAddress = address => {
    this.setState({ address: address });
  };

  render() {
    const { intl, options } = this.props;
    return (
      <div className="coa-Trashy">
        <TrashyAddress
          suggestions={this.state.addressSuggestions}
          setAddress={this.setAddress}
          getSuggestions={this.getAddressSuggestions}
        />
        {this.state.address && (
          <TrashySchedule
            address={this.state.address.name}
            pickupDates={pickupDates}
            nextBulkPickupDate={nextBulkPickupDate}
          />
        )}
      </div>
    );
  }
}

export default Trashy;
