import React from 'react';
import { withRouteData } from 'react-static';
import { defineMessages, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

// TODO: this jsonFileData is temporary. Add it to Wagtail API
import jsonFileData from '__tmpdata/pages';
import TileGroup from 'js/modules/TileGroup';
import PageBreadcrumbs from 'js/modules/PageBreadcrumbs';
import PageHeader from 'js/modules/PageHeader';
import SectionHeader from 'js/modules/SectionHeader';
import FormFeedback from 'js/page_sections/FormFeedback';
import ThreeOneOne from 'js/page_sections/ThreeOneOne';
import { cleanServiceLinks } from 'js/helpers/cleanData';

const i18nMessages = defineMessages({
  serviceRelatedlinksTag: {
    id: 'Service.RelatedLinks.Tag',
    defaultMessage: 'Service',
  }
})

const Topic = ({ topic, intl }) => {
  const {
    theme,
    text: title,
    description,
    callToAction,
    services: links,
  } = topic;

  const { services311 } = jsonFileData;
  const relatedLinks = cleanServiceLinks(links);

  return (
    <div className="wrapper--top-border">
      <PageBreadcrumbs title={title} order={['topic']} topic={theme} />

      <div className="wrapper wrapper--sm container-fluid">
        <PageHeader title={title} description={description} />
        <SectionHeader title={callToAction} />
      </div>

      <div className="wrapper container-fluid">
        <TileGroup tiles={relatedLinks}
          tag={intl.formatMessage(i18nMessages.serviceRelatedlinksTag)}
        />
      </div>

      <ThreeOneOne services311={services311} />
    </div>
  )
}

Topic.propTypes = {
  topic: PropTypes.shape({
    text: PropTypes.string.isRequired,
    callToAction: PropTypes.string,
    description: PropTypes.string,
    services: PropTypes.object.isRequired,
    theme: PropTypes.shape({
      text: PropTypes.string,
      slug: PropTypes.string,
    }).isRequired,
  })
};

export default withRouteData(injectIntl(Topic));
