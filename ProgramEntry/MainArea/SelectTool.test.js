/* eslint-disable no-unused-vars */
/* global jest describe test expect mount */
import React from 'react'
import { SelectTool } from './SelectTool';

jest.useFakeTimers();

describe('SelectTool test set', () => {
  test('SelectTool renders properly', () => {
    let selectTool = mount(<SelectTool width={1} height={1} />);
    expect(selectTool).toMatchSnapshot();
    expect(selectTool.instance().canvas).toBeTruthy();
  });
  test('Mouse events working correctly', () => {
    SelectTool.prototype.canvas = document.createElement('canvas');
    const selectToolWrapper = shallow(<SelectTool width={1} height={1} changeMouseType={{ mouseType: 'select' }} />);
    const spy = jest.spyOn(selectToolWrapper.instance(), 'findxy');
    selectToolWrapper.update();
    selectToolWrapper.instance().forceUpdate();
    selectToolWrapper.simulate('mousemove', { preventDefault: () => true })
    expect(spy).toBeCalled();
    selectToolWrapper.simulate('mousedown', { preventDefault: () => true })
    expect(spy).toBeCalled();
    selectToolWrapper.simulate('mouseup', { preventDefault: () => true })
    expect(spy).toBeCalled();
    selectToolWrapper.simulate('mouseout', { preventDefault: () => true })
    expect(spy).toBeCalled();
  });
});
