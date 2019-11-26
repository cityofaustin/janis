import React from 'react';

import Recollect from 'components/Recollect';

export default {
  title: 'Recollect',
};

export const recollect = () => (
  <div className="wrapper container-fluid">
    <code
      style={{
        color: 'white',
        backgroundColor: '#170821',
        padding: '10px',
        display: 'block',
      }}
    >
      <p>
        Storybook puts everything inside an iframe. Recollect says "This widget cannot function
        properly in an iframe. Please contact support@recollect.net for help with embedding the
        widget." 🙃{' '}
      </p>
    </code>
    <Recollect options={{ name: 'calendar' }} />
  </div>
);

recollect.story = {
  name: 'recollect',
};
