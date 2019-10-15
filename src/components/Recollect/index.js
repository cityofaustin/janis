import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Script from 'react-load-script';
import { injectIntl } from 'react-intl';

import { form as i18n } from 'js/i18n/definitions';

class Recollect extends Component {
  handleScriptLoad(options) {
    // Recollect is a third party script that isn't an import-able node module
    // rCw is the required container id to ensure styles are shown correctly
    const widgetOptions = Object.assign(
      {
        area: 'Austin',
        container: '#rCw',
      },
      options,
    );
    let loader = new window.Recollect.Widget.Loader(widgetOptions);
    const scrollToId = window.location.hash.split('#')[1];
    if (scrollToId) {
      document.getElementById(scrollToId).scrollIntoView(true);
    }
    loader.load();
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { intl, options } = this.props;
    return (
      <div className="coa-Recollect" id="rCw">
        <img
          alt={intl.formatMessage(i18n.loading)}
          src="https://recollect.a.ssl.fastly.net/0.11.1516038288/images/loading.gif"
        />
        <Script
          url="https://recollect.net/api/widget.js"
          onLoad={this.handleScriptLoad.bind(this, options)}
        />
      </div>
    );
  }
}

Recollect.propTypes = {
  options: PropTypes.object.isRequired,
};

export default injectIntl(Recollect);
