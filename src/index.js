import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { IntlProvider } from 'react-intl';

// Your top level component
import App from './App'

// Export your top level component as JSX (for static rendering)
export default App

// Render your app
if (typeof document !== 'undefined') {
  const target = document.getElementById('root')

  const renderMethod = target.hasChildNodes()
    ? ReactDOM.hydrate
    : ReactDOM.render

  if (!global.Intl) {
    global.Intl = require('intl');
  }

  const render = Comp => {
    renderMethod(
      <IntlProvider locale="en">
        <AppContainer>
          <Comp />
        </AppContainer>
      </IntlProvider>,
      target
    )
  }

  // Render!
  render(App)

  // Hot Module Replacement
  if (module && module.hot) {
    module.hot.accept('./App', () => {
      render(App)
    })
  }
}
