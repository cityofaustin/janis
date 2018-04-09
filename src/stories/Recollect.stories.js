import React from 'react';

import { storiesOf } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y';
import { IntlProvider } from 'react-intl';


import Recollect from 'js/modules/Recollect';


storiesOf('Recollect', module)
  .addDecorator(checkA11y)
  .add('recollect', () => (
    <IntlProvider locale="en">
      <div className="wrapper container-fluid">
        <code style={{ color: 'white', backgroundColor: '#170821', padding: '10px', display: 'block' }}>
          <p>Storybook puts everything inside an iframe. Recollect says "This widget cannot function properly in an iframe. Please contact support@recollect.net for help with embedding the widget." 🙃 </p>
        </code>
        <Recollect options={{name:"calendar"}} />
      </div>
    </IntlProvider>
  ))
