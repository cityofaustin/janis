import React from 'react';
import { defineMessages } from 'react-intl';

const i18nMessages = defineMessages({
  homeHeroWelcometext: {
    id: 'Home.Hero.welcometext',
    defaultMessage: 'Hi there, welcome to',
    description: 'Homepage hero welcome text'
  },
});


const HeroHome = ({image, intl}) => (
  <div
    className="coa-HeroHome"
    style={{
      backgroundImage: `
        linear-gradient(rgba(36, 11, 51, .3), rgba(36, 11, 51, .3)),
        url(${process.env.CMS_MEDIA}/${image.file})
      `,
      backgroundSize: 'cover',
      backgroundPosition: '50%',
    }}
    role="img"
    aria-label={image.title}
  >
    <div className="container-fluid wrapper">
      <span className="coa-HeroHome-preheader">{intl.formatMessage(i18nMessages.homeHeroWelcometext)}</span>
      <h2 className="coa-HeroHome-header">Austin, TX</h2>
    </div>
  </div>
);

export default HeroHome;
