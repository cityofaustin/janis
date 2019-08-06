import React from 'react';
import { withRouteData, Head } from 'react-static';
import { injectIntl } from 'react-intl';

import ContextualNav from 'components/PageSections/ContextualNav';

import GuideSection from 'components/Pages/Guide/GuideSection';
import GuideBannerImage from 'components/Pages/Guide/GuideBannerImage';

const Guide = ({
  guidePage: {
    id,
    title,
    description,
    slug,
    topic,
    topics,
    theme,
    department,
    relatedDepartments,
    sections,
    image,
  },
  intl,
}) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <ContextualNav
        topic={topic}
        topics={topics}
        topiccollection={topic && topic.topiccollection}
        theme={theme}
        department={department}
        relatedDepartments={relatedDepartments}
      />
      <div>
        <div className="wrapper container-fluid">
          <GuideBannerImage image={image} />
        </div>
        <div className="coa-GuidePage-header--container">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div className="coa-Page__all-of-the-content">
          <div className="wrapper container-fluid">
            <div className="row">
              <div className="coa-GuidePage__navSidebar col-md-4">
                Coming Soon
              </div>
              <div className="col-xs-12 col-md-8">
                {sections.map((section, index) => (
                  <GuideSection section={section} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouteData(injectIntl(Guide));
