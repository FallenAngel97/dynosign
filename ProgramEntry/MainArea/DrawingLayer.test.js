/* eslint-disable no-unused-vars */
/* global beforeAll describe test expect mount jest color */
import React from 'react';
import { mapDispatchToProps, DrawingLayer } from './DrawingLayer';
import { defaultLayer } from '../reducers';

window.devicePixelRatio = 1;
describe('DrawingLayer test set', () => {
  beforeAll(() => {
    global.color = {
      r: '241',
      g: '112',
      b: '19',
      a: '1'
    };
  });
  test('DrawingLayer can add line', () => {
    const dispatch = jest.fn();
    const canvas = document.createElement('canvas');
    const layerNumber = 2;
    const expectedAction = {
      type: 'ADD_LINE', lineData: canvas.toDataURL(), layerNumber
    }
    mapDispatchToProps(dispatch).addLine(canvas, layerNumber);
    expect(dispatch.mock.calls[0][0]).toEqual(expectedAction);
  });
  test('DrawingLayer renders properly', () => {
    const layer = mount(<DrawingLayer layer={defaultLayer} width={1} height={1} changeColor={{ color }} />);
    expect(layer).toMatchSnapshot();
    expect(layer.instance().canvas).toBeTruthy();
  });
  test('Mouse events working correctly', () => {
    const spy = jest.spyOn(DrawingLayer.prototype, 'findxy');
    const addLine = jest.fn();
    const _changeActiveLayer = jest.fn();
    const drawingLayer = mount(<DrawingLayer
      layer={defaultLayer}
      width={1} height={1}
      changeColor={{ color }}
      addLine={ addLine }
      _changeActiveLayer = {_changeActiveLayer}
      layersCRUD = { [defaultLayer] }
      changeActiveLayer={{ layerNumber: 0 }}
      changeMouseType={{ mouseType: 'draw' }} />);
    drawingLayer.simulate('mousemove', { preventDefault: () => true })
    expect(spy).toHaveBeenCalled();
    drawingLayer.simulate('mousedown', { preventDefault: () => true })
    expect(spy).toHaveBeenCalled();
    drawingLayer.simulate('mouseup', { preventDefault: () => true })
    expect(spy).toHaveBeenCalled();
    drawingLayer.simulate('mouseout', { preventDefault: () => true })
    expect(spy).toHaveBeenCalled();
  });
  test('findxy can handle move', () => {
    const drawingLayer = mount(<DrawingLayer
      layer={defaultLayer}
      width={1} height={1}
      changeColor={{ color }}
      changeActiveLayer={{ layerNumber: 0 }}
      changeMouseType={{ mouseType: 'draw' }} />);
    const ev = {
      clientX: 200,
      clientY: 200
    };
    drawingLayer.instance().flag = true;
    drawingLayer.instance().findxy('move', ev);
    expect(drawingLayer.instance().currY).toEqual(200);
  });
  test('Do nothing, if not drawing', () => {
    const drawingLayer = mount(<DrawingLayer
      layer={defaultLayer}
      width={1} height={1}
      changeColor={{ color }}
      changeActiveLayer={{ layerNumber: 0 }}
      changeMouseType={{ mouseType: 'default' }} />);
    const ev = {
      clientX: 200,
      clientY: 200
    };
    drawingLayer.instance().findxy('move', ev);
    expect(drawingLayer.instance().currY).toEqual(undefined);
  });
});
