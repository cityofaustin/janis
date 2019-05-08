import React from 'react';
import ExternalLink from 'components/ExternalLink';
//

// The secret to using non-static routes is here.

// We only display the contents of the 404 page after the component mounts.
// This way, when a non-static route loads as the first page, it will not flash
// the static 404 content before react mounts.

// If the route is in fact matched by a non-static route, it will render before
// the 404 page mounts :)
export default class extends React.Component {
  state = {
    ready: false,
  };
  componentDidMount() {
    this.makeReady();
  }
  makeReady = () => {
    if (!this.state.ready) {
      this.setState({
        ready: true,
      });
    }
  };
  render() {
    return this.state.ready ? (
      <div className="coa-404">
        <div className="wrapper container-fluid">
          <h1 className="coa-404__title">404</h1>
          <div className="coa-404__copy">
            <p>Sorry, this isn't the page you were hoping to find.</p>
            <p>
              You can browse from the <a href="/">home page</a>, or{' '}
              <ExternalLink to={'https://projects.austintexas.io/contact/'}>
                contact us
              </ExternalLink>.
            </p>
          </div>
        </div>
      </div>
    ) : null;
  }
}
