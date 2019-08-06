import React from 'react';
import { withRouteData, Head } from 'react-static';
import { injectIntl } from 'react-intl';

import ContextualNav from 'components/PageSections/ContextualNav';
import PageHeader from 'components/PageHeader';

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
        <PageHeader contentType={'guide'} description={description}>
          {title}
        </PageHeader>
        <div className="coa-Page__all-of-the-content">
          <div className="wrapper container-fluid">
            <div className="row">
              <div className="col-xs-12 col-md-8">
                {sections.edges.map((section, index) => (
                  <div>{JSON.stringify(section)}</div>
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
