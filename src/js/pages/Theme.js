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
import ArrowRight from 'js/svg/ArrowRight';

const Theme = ({ theme }) => {
  const title = get(theme, "text", null);
  const callToAction = get(theme, "callToAction", null);
  const description = get(theme, "description", null);
  const topics = get(theme, "topics", null);
  const services311 = get(jsonFileData, "services311", null);

  const themeStyles = {
    display: 'flex',
  }

  const topicStyles = {
    border: '4px solid #3282AF',
    padding: '0 4rem 5rem',
    borderRadius: '6px',
    marginTop: '5rem',
  }

  return (
    <div>
      {/* <PageBreadcrumbs title={title} order={['theme']} theme={theme} /> */}

      <div className="wrapper wrapper--sm container-fluid">
        <PageHeader title={title} description={description} />
      </div>

      <div className="wrapper container-fluid" style={themeStyles}>
      {
        topics && topics.edges.map(({node: topic}, i) => {
          if (topic.services.edges.length < 1) return false;
          const links = get(topic, "services", null);
          const relatedLinks = cleanServiceLinks(links);
          return (
            <div key={i} style={topicStyles}>
              <SectionHeader title={topic.text} arrow={true}/>
              <p>{topic.description}</p>
              <TileGroup tiles={relatedLinks} tag="service" />
            </div>
          )
        })
      }
      </div>


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
