import React from 'react';
import { withRouteData } from 'react-static';
import { defineMessages, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

// TODO: this jsonFileData is temporary. Add it to Wagtail API
import jsonFileData from '__tmpdata/pages';
import TileGroup from 'components/Tiles/TileGroup';
import PageBreadcrumbs from 'components/PageBreadcrumbs/PageBreadcrumbs';
import PageHeader from 'components/PageHeader/PageHeader';
import SectionHeader from 'components/SectionHeader/SectionHeader';
import ThreeOneOne from 'components/PageSections/ThreeOneOne/ThreeOneOne';
import { cleanLinks } from 'js/helpers/cleanData';

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
  //TODO: clean data where sourced
  const relatedLinks = cleanLinks(links, '/services');

  return (
    <div>
      <PageBreadcrumbs
        parent={{...theme, subpath: 'themes'}}
        title={title}
      />
      <div className="wrapper wrapper--sm container-fluid">
        <PageHeader title={title} description={description} hasBorder={true} />
        <SectionHeader hasHighlight={true}>{callToAction}</SectionHeader>
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
