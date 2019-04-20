/* global shallow */
import React from 'react';
import LayerPopupContextMenu from './LayerPopupContextMenu';

describe('LayerPopupContextMenu tests', () => {
  test('LayerPopupContextMenu properly renders', () => {
    let layerPopupContextMenu = shallow(<LayerPopupContextMenu />);
    expect(layerPopupContextMenu).toMatchSnapshot();
  });
});
