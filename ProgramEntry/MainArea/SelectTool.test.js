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
    const spy = jest.spyOn(SelectTool.prototype, 'findxy');
    const selectTool = mount(<SelectTool width={1} height={1} changeMouseType={{ mouseType: 'select' }} />);
    selectTool.simulate('mousemove', { preventDefault: () => true })
    expect(spy).toBeCalled();
    selectTool.simulate('mousedown', { preventDefault: () => true })
    expect(spy).toBeCalled();
    selectTool.simulate('mouseup', { preventDefault: () => true })
    expect(spy).toBeCalled();
    selectTool.simulate('mouseout', { preventDefault: () => true })
    expect(spy).toBeCalled();
  });
});
