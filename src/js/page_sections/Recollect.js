import React, {Component} from 'react';

class Recollect extends Component {

  componentDidMount() {

    let script = document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.text = '_recollect_config = { area: "Austin", page: "tabbed_widget", name: "calendar", container: "#recollectTest" };';
      this.el.appendChild(script);

    let script2 = document.createElement('script');
      script2.setAttribute('type', 'text/javascript');
      script2.setAttribute('src', 'https://recollect.net/api/widget.js');
      this.el.appendChild(script2);

  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div>
        <div id="recollectTest" ref={el => this.el = el}>
          Recollect Loading...
          <img alt="Loading" src="https://recollect.a.ssl.fastly.net/0.11.1516038288/images/loading.gif"/>
        </div>
      </div>
    );
  }
}

export default Recollect;

/*

<script>_recollect_config = { area: "Austin", page: "tabbed_widget", name: "calendar" }
</script>
<script src="https://recollect.net/api/widget.js"></script>

*/
