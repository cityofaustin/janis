import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y';
import { MemoryRouter } from 'react-router-dom';
import { FormattedMessage, IntlProvider } from 'react-intl';

import SecondaryContentBanner from 'js/page_sections/SecondaryContentBanner';
import ExternalLink from 'js/modules/ExternalLink';

storiesOf('SecondaryContentBanner', module)
  .addDecorator(checkA11y)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('SecondaryContentBanner', () => (
    <IntlProvider locale="en">
      <SecondaryContentBanner>
        <p>
          <FormattedMessage
            id="Home.Secondarycontent.bodytext"
            defaultMessage="Alpha.austin.gov is a new website and a work in progress. For the full City of Austin website, visit  {citySiteLink}. Learn more about the new website at {projectsSiteLink}."
            values = {{
              citySiteLink: <ExternalLink to="https://austintexas.gov">austintexas.gov</ExternalLink>,
              projectsSiteLink: <ExternalLink to="https://bit.ly/atx-digital-services">projects.austintexas.io</ExternalLink>
            }}
          />
        </p>
      </SecondaryContentBanner>
    </IntlProvider>
  ))
