import React from 'react';
import { withRouteData } from 'react-static';
import { get } from 'lodash';
import { cleanServiceLinks } from 'js/helpers/cleanData';
import PropTypes from 'prop-types';

// TODO: this jsonFileData is temporary. Add it to Wagtail API
import jsonFileData from '__tmpdata/pages';
import TileGroup from 'js/modules/TileGroup';
import PageBreadcrumbs from 'js/modules/PageBreadcrumbs';
import PageHeader from 'js/modules/PageHeader';
import SectionHeader from 'js/modules/SectionHeader';
import FormFeedback from 'js/page_sections/FormFeedback';
import ThreeOneOne from 'js/page_sections/ThreeOneOne';

const Topic = ({ topic }) => {
  const title = get(topic, "text", null);
  const callToAction = get(topic, "callToAction", null);
  const description = get(topic, "description", null);
  const links = get(topic, "services", null);
  const theme = get(topic, "theme", null);
  const relatedLinks = cleanServiceLinks(links);
  const services311 = get(jsonFileData, "services311", null);

  return (
    <div>
      <PageBreadcrumbs title={title} order={['topic']} topic={theme} />

      <div className="wrapper wrapper--sm container-fluid">
        <PageHeader title={title} description={description} />
        <SectionHeader title={callToAction} />
      </div>

      <TileGroup tiles={relatedLinks} />

      <ThreeOneOne services311={services311} />
    </div>
  )
}

Topic.propTypes = {
  topic: PropTypes.shape({
    text: PropTypes.string,
    callToAction: PropTypes.string,
    description: PropTypes.string,
    services: PropTypes.string,
    theme: PropTypes.string,
  })
};

export default withRouteData(Topic);
