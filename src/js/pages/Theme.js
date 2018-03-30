import React from 'react';
import { withRouteData } from 'react-static';
import PropTypes from 'prop-types';

// TODO: this jsonFileData is temporary. Add it to Wagtail API
import jsonFileData from '__tmpdata/pages';
import TileGroupSet from 'js/modules/TileGroupSet';
import PageBreadcrumbs from 'js/modules/PageBreadcrumbs';
import PageHeader from 'js/modules/PageHeader';
import ThreeOneOne from 'js/page_sections/ThreeOneOne';

const Theme = ({ theme }) => {
  const { text: title, callToAction, description, topics } = theme;
  const { services311 } = jsonFileData;

  return (
    <div>
      {/* <PageBreadcrumbs title={title} order={['theme']} theme={theme} /> */}

      <div className="wrapper wrapper--sm container-fluid">
        <PageHeader title={title} description={description} />
      </div>

      <div className="wrapper container-fluid">
        <TileGroupSet groups={topics}
          tileKey={'services'}
          groupTitleSubPath={'topics'}
        />
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
