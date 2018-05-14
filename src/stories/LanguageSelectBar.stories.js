import React from 'react';
import { storiesOf } from '@storybook/react';

import LanguageSelectBar from 'components/PageSections/LanguageSelectBar';
import { SUPPORTED_LANGUAGES } from 'js/i18n/constants';

storiesOf('LanguageSelectBar', module).add('LanguageSelectBar', () => (
  <LanguageSelectBar path="" />
));
