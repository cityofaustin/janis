import React from 'react';
import { storiesOf } from '@storybook/react';
import { cloneDeep } from 'lodash';

import GuidePage from 'components/Pages/Guide';
import { basicData } from "./GuidePage.data.js";

export default {
  title: 'Pages|GuidePage',
};

export const basic = () => {
  const data = basicData();

  return (
    <GuidePage
      guidePage={data}
    />
  );
}
basic.story = {
  name: "Basic"
}
