import React from 'react';
import { withRouteData } from 'react-static';
import { get } from 'lodash';
import { cleanLinks } from 'js/helpers/cleanData';
import PropTypes from 'prop-types';

// TODO: this jsonFileData is temporary. Add it to Wagtail API
import jsonFileData from '__tmpdata/pages';
import TileGroup from 'js/modules/TileGroup';
import PageBreadcrumbs from 'js/modules/PageBreadcrumbs';
import PageHeader from 'js/modules/PageHeader';
import SectionHeader from 'js/modules/SectionHeader';
import FormFeedback from 'js/page_sections/FormFeedback';
import ThreeOneOne from 'js/page_sections/ThreeOneOne';

const Theme = ({ theme }) => {
  const title = get(theme, "text", null);
  const callToAction = get(theme, "callToAction", null);
  const description = get(theme, "description", null);
  const topics = get(theme, "topics", null);
  // const theme = get(theme, "theme", null);
  const relatedLinks = cleanLinks(topics, 'services');
  const services311 = get(jsonFileData, "services311", null);
  console.log(topics)

  const themeStyles = {
    display: 'flex',
  }

  return (
    <div>
      {/* <PageBreadcrumbs title={title} order={['theme']} theme={theme} /> */}

      <div className="wrapper wrapper--sm container-fluid">
        <PageHeader title={title} description={description} />
      </div>

      <div style={themeStyles}>
      {
        topics && topics.edges.map(({node: topic}) => (
          <div>
            <SectionHeader title={topic.text} />
            <p>{topic.description}</p>
          </div>

        ))
      }
      </div>

      <TileGroup tiles={relatedLinks} />

      <ThreeOneOne services311={services311} />
    </div>
  )
}

Theme.propTypes = {
  theme: PropTypes.shape({
    text: PropTypes.string,
    callToAction: PropTypes.string,
    description: PropTypes.string,
    services: PropTypes.string,
    theme: PropTypes.string,
  })
};

export default withRouteData(Theme);
