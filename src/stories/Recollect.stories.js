import React from 'react';
import { storiesOf } from '@storybook/react';

import Recollect from 'components/Recollect';

storiesOf('Recollect', module)
  .add('recollect', () => (
    <div className="wrapper container-fluid">
      <code style={{ color: 'white', backgroundColor: '#170821', padding: '10px', display: 'block' }}>
        <p>Storybook puts everything inside an iframe. Recollect says "This widget cannot function properly in an iframe. Please contact support@recollect.net for help with embedding the widget." 🙃 </p>
      </code>
      <Recollect options={{name:"calendar"}} />
    </div>
  ))
