import React from 'react';
import renderer from 'react-test-renderer';
// BrowserRouter is necessary so the tests know where to find Link
import { BrowserRouter } from 'react-router-dom';

import createComponentWithIntl from 'js/helpers/createComponentWithIntl';
import Tile from './../Tile';
import TileGroup from './../TileGroup';

describe('Tile', () => {
  test('tile renders compact true', () => {
    const component = renderer.create(
      <BrowserRouter>
      	<Tile
      		compact={true}
          text="home"
          url="https://alpha.austin.gov"
      	/>
      </BrowserRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('tile renders with compact false', () => {
    const component = renderer.create(
      <BrowserRouter>
        <Tile
          compact={false}
          text="home"
          url="https://alpha.austin.gov"
        />
      </BrowserRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
});

describe('TileGroup', () => {
  test('tile group renders with compact true', () => {
    const tiles = [
      {
        "url":"/health-safety/disaster-safety-relief/chronic-disease-prevention/set-out-your-leaves-grass-and-branches-for-pickup/",
        "title":"Set out your leaves, grass, and branches for pickup"
      },
      {
        "url":"/health-safety/disaster-safety-relief/chronic-disease-prevention/set-out-your-leaves-grass-and-branches-for-pickup/",
        "title":"Set out your leaves, grass, and branches for pickup"
      },
    ];
    const intl = {"locale": "en"};

    const component = createComponentWithIntl(
      <BrowserRouter>
        <TileGroup
          title="Chronic disease prevention →"
          titleUrl="/health-safety/disaster-safety-relief/chronic-disease-prevention"
          description="Chronic diseases are ongoing medical conditions such as diabetes..."
          tiles={tiles}
          compact
          intl={intl}
        />
      </BrowserRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('tile group renders with compact false', () => {
    const tiles = [
      {
        "url":"/health-safety/disaster-safety-relief/chronic-disease-prevention/set-out-your-leaves-grass-and-branches-for-pickup/",
        "title":"Set out your leaves, grass, and branches for pickup"
      },
      {
        "url":"/health-safety/disaster-safety-relief/chronic-disease-prevention/set-out-your-leaves-grass-and-branches-for-pickup/",
        "title":"Set out your leaves, grass, and branches for pickup"
      },
    ];
    const intl = {"locale": "en"};

    const component = createComponentWithIntl(
      <BrowserRouter>
        <TileGroup
          title="Chronic disease prevention →"
          titleUrl="/health-safety/disaster-safety-relief/chronic-disease-prevention"
          description="Chronic diseases are ongoing medical conditions such as diabetes..."
          tiles={tiles}
          compact={false}
          intl={intl}
        />
      </BrowserRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
