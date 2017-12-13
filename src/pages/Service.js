import React, { Component } from 'react';
import { get } from 'lodash';
import axios from 'axios';

import ContentItems from 'components/ContentItems';
import RelatedLinks from 'components/RelatedLinks';
import FormFeedback from 'components/FormFeedback';
import Contact from 'components/Contact';
import Service311 from 'components/Service311';

import jsonFileData from '__tmpdata/services';

class Service extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }


  componentDidMount() {
    // const s = document.createElement('script');
    // s.type = 'text/javascript';
    // s.innerHTML = '_recollect_config = { area: "Austin", page: "tabbed_widget", name: "calendar" }';
    // this.instance.appendChild(s);

    // let s2 = document.createElement("script");
    // s2.src = "https://recollect.net/0.0.1513115057520/javascript/compiled//recollect-l10n-widget.en-US.js";
    // this.instance.appendChild(s2);

    // s2 = document.createElement("script");
    // s2.src = "https://recollect.net/0.0.1513115057520/javascript/compiled//recollect-widget-prod-us.js";
    // this.instance.appendChild(s2);

    // s2 = document.createElement("script");
    // s2.src = "https://recollect.net/api/areas/Austin/services/waste.json?callback=svc_cb_1513139115936";
    // this.instance.appendChild(s2);

    // s2 = document.createElement("script");
    // s2.src = "https://recollect.net/api/widget.js";
    // this.instance.appendChild(s2);

    axios
      .get(`${process.env.REACT_APP_CMS_ENDPOINT}/pages/${this.props.match.params.id}?fields=content,extra_content,theme(text)`)
      .then(res => {
        this.setState({ data: res.data })
      })
      .catch(err => console.log(err))
  }

  render() {
    const { data } = this.state;

    const topicId = get(data, "theme.id", null);
    const topicName = get(data, "theme.text", null);
    const title = get(data, "title", null);
    const steps = get(data, "content", null);
    const contentItems = get(data, "extra_content", null);
    const phone = get(jsonFileData, "contact.phone", null);
    const email = get(jsonFileData, "contact.email", null);
    const address = get(jsonFileData, "contact.address", null);
    const hours = get(jsonFileData, "contact.hours", null);
    const relatedlinks = get(jsonFileData, "servicesRelated", null);
    const services311 = get(jsonFileData, "services311", []);

    return (

      <div>

        <div ref={el => (this.instance = el)} />

        <div className="wrapper">
          <div className="coa-page_hero--small"></div>
        </div>

        <div className="wrapper">
          <div className="row">
            <div className="coa-page_left col-xs-12 col-lg-8">

              <div className="coa-section">
                { topicId && ( <a className="coa-page_breadcrumb" href={`/services/topic/${topicId}`}>{topicName}</a> )}
                <h2 className="coa-page_title">{title}</h2>
                { steps && ( <div className="coa-steps" dangerouslySetInnerHTML={{__html: steps}} /> )}
              </div>

              <ContentItems contentItems={contentItems} />

            </div>

            <div className="coa-page_right col-xs-12 col-lg-4">

              <Contact phone={phone} email={email} address={address} hours={hours} />

            </div>
          </div>
        </div>

        <RelatedLinks relatedlinks={relatedlinks} topicId={topicId} topicName={topicName} />

        <div className="coa-section coa-section--lightgrey">
          <div className="wrapper">
            <FormFeedback />
            <a className="coa-section__link" href="#">Return to Top</a>
          </div>
        </div>

        <Service311 services311={services311} />

      </div>
    );
  }

}

export default Service;
