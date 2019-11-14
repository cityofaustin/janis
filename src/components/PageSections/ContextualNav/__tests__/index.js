import React from 'react';
import renderer from 'react-test-renderer';
// BrowserRouter is necessary so the tests know where to find Link
import { BrowserRouter } from 'react-router-dom';

import createComponentWithIntl from 'js/helpers/createComponentWithIntl';
import ContextualNav from '../../ContextualNav'
import RelatedToMobile from '../../ContextualNav/RelatedToMobile/'

describe('ContextualNav snapshot', () => {
  test('ContextualNav renders', () => {
    const parent = {
      id: "VG9waWNOb2RlOjUz",
      title: "Disease prevention",
      url: "/health-safety/healthcare-prevention/disease-prevention/"
    };
    const relatedTo = [
      {
        id: "VG9waWNOb2RlOjU3",
        title: "Household waste",
        url: "/housing-utilities/recycling-trash-and-compost/household-waste/"
      },
      {
        id: "VG9waWNOb2RlOjU5",
        title: "Recycling and reuse",
        url: "/housing-utilities/recycling-trash-and-compost/recycling-reuse/"
      }
    ];
    const offeredBy = [
      {
        id: "RGVwYXJ0bWVudFBhZ2VOb2RlOjExNw==",
        title: "Austin Public Health",
        url: "/austin-public-health/"
      }
    ];

    const component = createComponentWithIntl(
      <BrowserRouter>
      	<ContextualNav
          parent={parent}
          relatedTo={relatedTo}
          offeredBy={offeredBy}
      	/>
      </BrowserRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('RelatedToMobile snapshot', () => {
  test('RelatedToMobile renders', () => {
    const relatedTo = [
      {
        id: "VG9waWNOb2RlOjU3",
        title: "Household waste",
        url: "/housing-utilities/recycling-trash-and-compost/household-waste/"
      },
      {
        id: "VG9waWNOb2RlOjU5",
        title: "Recycling and reuse",
        url: "/housing-utilities/recycling-trash-and-compost/recycling-reuse/"
      }
    ];
    const offeredBy = [
      {
        id: "RGVwYXJ0bWVudFBhZ2VOb2RlOjExNw==",
        title: "Austin Public Health",
        url: "/austin-public-health/"
      }
    ];

    const component = createComponentWithIntl(
      <BrowserRouter>
        <RelatedToMobile
          relatedTo={relatedTo}
          offeredBy={offeredBy}
        />
      </BrowserRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

