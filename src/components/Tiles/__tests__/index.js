import React from 'react';
import renderer from 'react-test-renderer';
// BrowserRouter is necessary so the tests know where to find Link
import { BrowserRouter } from 'react-router-dom';

import Tile from './../Tile';

describe('Tile', () => {
  test('tile renders', () => {
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
});