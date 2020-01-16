/* global defaultLayer shallow */
import React from 'react';
import { RightPanel, mapDispatchToProps } from './RightPanel';

describe('RightPanel test', () => {
  test('RightPanel can delete layer', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).deleteLayer(0);
    expect(dispatch.mock.calls[0][0]).toEqual(
      { type: 'DELETE_LAYER', layerId: 0 }
    );
    const deleteLayer = jest.fn();
    let rightPanel = shallow(<RightPanel deleteLayer={deleteLayer} layersCRUD={[]} changeActiveLayer={{ layer: { opacity: 0 }, layerNumber: 0 }} />);
    rightPanel.find('#layersButtonsBottom button').at(2).simulate('click');
    expect(deleteLayer).toHaveBeenCalledWith(0);
  })
  test('RightPanel can add layer', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).addLayer(1);
    expect(dispatch.mock.calls[0][0]).toEqual(
      {
        type: 'ADD_LAYER',
        layer:
        {
          ...defaultLayer,
          name: 'New layer ' + 1
        },
        layerNumber: 1
      }
    );
    const addLayer = jest.fn();
    let rightPanel = shallow(<RightPanel addLayer={addLayer} layersCRUD={[]} changeActiveLayer={{ layer: { opacity: 0 }, layerNumber: 0 }} />);
    rightPanel.find('#layersButtonsBottom button').at(1).simulate('click');
    expect(addLayer).toHaveBeenCalledWith(0);
  })
  test('RightPanel can change layer', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).changeLayer(defaultLayer, 0);
    expect(dispatch.mock.calls[0][0]).toEqual(
      { type: 'CHANGE_LAYER', layer: defaultLayer, layerId: 0 }
    );
  });
  test('RightPanel properly renders', () => {
    let rightPanel = shallow(<RightPanel layersCRUD={[]} changeActiveLayer={{ layer: { opacity: 0 } }} />);
    expect(rightPanel).toMatchSnapshot();
    rightPanel = shallow(<RightPanel layersCRUD={[1]} changeActiveLayer={{ layer: { opacity: 0 } }} />);
    expect(rightPanel).toMatchSnapshot();
  });
  test('RightPanel can change opacity', () => {
    const changeLayer = jest.fn();
    let rightPanel = shallow(<RightPanel changeLayer={changeLayer} layersCRUD={[]} changeActiveLayer={{ layer: { opacity: 0 }, layerNumber: 0 }} />);
    rightPanel.find('#topRightPanelIndicators input').simulate('change', { target: { value: 50 } });
    expect(changeLayer).toHaveBeenCalledWith(
      { opacity: 50 }, 0
    );
  });
})
