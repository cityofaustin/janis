import React from 'react';
import { storiesOf } from '@storybook/react';

import LanguageSelectBar from 'js/page_sections/LanguageSelectBar';
import { SUPPORTED_LANGUAGES } from 'js/i18n/constants';

storiesOf('LanguageSelectBar', module)
  .add('english', () => (
    <LanguageSelectBar lang="en" />
  ))
  .add('spanish', () => (
    <LanguageSelectBar lang="es" />
  ))
  .add('arabic', () => (
    <LanguageSelectBar lang="ar" />
  ))
  .add('vietnamese', () => (
    <LanguageSelectBar lang="vi" />
  ))
