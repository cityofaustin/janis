import React, { Component } from 'react';
import axios from 'axios';

import TrashySchedule from 'components/Trashy/TrashySchedule';
import TrashyAddress from 'components/Trashy/TrashyAddress';

class Trashy extends Component {
  state = {
    address: null,
    addressSuggestions: [],
    pickupDates: [],
    nextBulkPickupDate: null,
  };

  getRecollectAddressSuggestions = addressText => {
    axios
      .post('https://recollect-wrapper.herokuapp.com/api/suggest', {
        address: addressText,
      })
      .then(response => this.setState({ addressSuggestions: response.data }))
      .catch(error => console.log(error));
  };

  getCalendar = addressId => {
    axios
      .post('https://recollect-wrapper.herokuapp.com/api/calendar', {
        id: addressId,
      })
      .then(response => this.setState({ pickupDates: response.data }))
      .catch(error => console.log(error));
  };

  getNextBulkPickupDate = addressId => {
    axios
      .post('https://recollect-wrapper.herokuapp.com/api/nextbulkpickup', {
        id: addressId,
      })
      .then(response => this.setState({ nextBulkPickupDate: response.data[0] }))
      .catch(error => console.log(error));
  };

  getRecollectPickupDataForAddress = address => {
    axios
      .post('https://recollect-wrapper.herokuapp.com/api/address', address)
      .then(response => response.data)
      .then(addressId => {
        this.getCalendar(addressId);
        this.getNextBulkPickupDate(addressId);
      })
      .catch(error => console.log(error));
  };

  setAddress = address => {
    this.setState({ address: address });
    this.getRecollectPickupDataForAddress(address);
  };

  render() {
    const { intl, options } = this.props;
    return (
      <div className="coa-Trashy">
        <TrashyAddress
          suggestions={this.state.addressSuggestions}
          setAddress={this.setAddress}
          getSuggestions={this.getRecollectAddressSuggestions}
        />
        {this.state.address && (
          <TrashySchedule
            address={this.state.address.name}
            pickupDates={this.state.pickupDates}
            nextBulkPickupDate={this.state.nextBulkPickupDate}
          />
        )}
      </div>
    );
  }
}

export default Trashy;
