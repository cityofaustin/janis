import React, { Component } from 'react';
import SectionTitle from 'js/modules/SectionTitle';
import Recollect from 'js/modules/Recollect';
import StaticMap from 'js/modules/StaticMap';

class ApplicationBlock extends Component {

  getApp() {

    const { type, data } = this.props;
    let app, title;

    switch(type) {
      case "collection_schedule_block":
        app = <Recollect name="calendar"/>;
        title = "Use this form to look up your pickup schedule";
        break;

      case "what_do_i_do_with_block":
        app = <Recollect name="wizard"/>;
        title = "Recycling Guidelines";
        break;

      case "map_block":
        app = <StaticMap title={data.description} location={data.location} />;
        title = data.description;
        break;
    }

    return { app, title };
  }

  render() {

    const { app, title } = this.getApp();
    let JSX;

    if (!app) {
      JSX = null;
    } else {
      JSX = (
        <div className="coa-ApplicationBlock">
          <SectionTitle title={title}/>
          {app}
        </div>
      );
    }

    return JSX;
  }
}

export default ApplicationBlock;
