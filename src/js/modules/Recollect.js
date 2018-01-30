import React, {Component} from 'react';
import Script from 'react-load-script';

class Recollect extends Component {

  handleScriptLoad() {
    // Recollect is a third party script that isn't an import-able node module
    let loader = new window.Recollect.Widget.Loader({
        area: "Austin",
        name: this.props.name || 'calendar',
        container: "#rCw"
      });
    loader.load();;
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
