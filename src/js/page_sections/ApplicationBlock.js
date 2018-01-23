import React, { Component } from 'react';
import SectionTitle from 'js/modules/SectionTitle';
import Recollect from 'js/modules/Recollect';
import StaticMap from 'js/modules/StaticMap';

class ApplicationBlock extends Component {

//TODO: getApp method is temporary
//joplin app block should return app type, title, body

  getApp() {

    const { type, data } = this.props;
    let app;

    switch(type) {
      case "Collection Schedule Lookup":
        app = <Recollect name="calendar"/>;
        break;

      case "What do I do with...":
        app = <Recollect name="wizard"/>;
        break;

      case "Map for Christmas Tree Dropoff":
        app = <StaticMap title="Map for Christmas Tree Dropoff" location={{
          "latitude":"30.266646",
          "longitude":"-97.772701"
        }} />
        break;

      case "Map for Hazardous Waste Dropoff Center":
        app = <StaticMap title="Map for Hazardous Waste Dropoff Center" location={{
          "street": "2514 Business Center Dr",
          "city": "Austin",
          "state": "Texas",
          "zip": "78744"
        }} />
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
