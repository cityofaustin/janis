import React, {Component} from 'react';
import Script from 'react-load-script';

class Recollect extends Component {

  handleScriptLoad() {

    // Recollect is a third party script,
    // that isn't an import-able node module
    // so we load the script as below
    // rCw is the required container id to ensure styles are shown correctly
    let script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.text = `
          window.loader = window.loader || new Recollect.Widget.Loader({
              area: "Austin",
              name: "${ this.props.name || 'calendar' }",
              container: "#rCw"
            });
          window.loader.load();`;
        document.getElementById('rCw').appendChild(script);
  }

  componentWillMount() {
    // TODO: temp fix as current implementation of recollect app is not SPA friendly
    if(window.Recollect) {
      window.location.reload();
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
        <div id="rCw">
          <img alt="Loading" src="https://recollect.a.ssl.fastly.net/0.11.1516038288/images/loading.gif"/>
          <Script
            url="https://recollect.net/api/widget.js"
            onLoad={this.handleScriptLoad.bind(this)}
          />
        </div>
    );
  }
}

export default Recollect;
