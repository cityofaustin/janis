import React, { Fragment } from 'react';
import { AppContext } from 'App';

function isEditable(Component) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isActiveEdit: false,
      };
    }

    render() {
      return (
        <AppContext.Consumer>
          {context => (
            <Component {...this.props} isInEditMode={context.isInEditMode} />
          )}
        </AppContext.Consumer>
      );
    }
  };
}

export default isEditable;
