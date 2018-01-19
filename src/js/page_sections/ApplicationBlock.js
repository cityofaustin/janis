import React, { Component } from 'react';
import SectionTitle from 'js/modules/SectionTitle';
import Recollect from 'js/modules/Recollect';

class ApplicationBlock extends Component {

//TODO: getApp method is temporary
//joplin app block should return app type, title, body

  getApp() {

    const { type, data } = this.props;
    let app;

    switch(type) {
      case 'Collection Schedule Lookup':
      case 'What do I do with...':
        app = <Recollect name={type}/>;
        break;
      case 'Map for Christmas Tree Dropoff':
      case 'Map for Hazardous Waste Dropoff Center':
        app = null; //TODO add map component block;
        break;
    }

    return app;
  }

  render() {

    const { type, title } = this.props;

    return (
      <div className="coa-ApplicationBlock">
        <SectionTitle title={title} noBorder={true} />
        {this.getApp()}
      </div>
    );
  }
}

export default ApplicationBlock;
