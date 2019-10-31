import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

import './app.scss';

const code = `.sidebar {
  position: sticky;
  top: 0;
}`

const App = () => {
  return (
    <div>
      <div class="banner">
        <h2>This is a banner image</h2>
      </div>
      <div class="wrapper">
        <div class="main">
          <h2>Main content</h2>
          <p>Scroll down the page!</p>
          <h3>How to recreate this</h3>
          <p>
            Position the columns with flex. Then apply two lines of CSS to the sidebar to make it sticky:
            <pre>
              {code}
            </pre>
          Include <code>position: -webkit-sticky;</code> for Safari.
          </p>
        </div>

        <div class="sidebar">
          <h3>Sticky sidebar</h3>
          <p>I will follow you!</p>
          <a href="https://caniuse.com/#search=sticky">caniuse stats</a>
        </div>
      </div>
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));
