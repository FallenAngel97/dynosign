/* eslint-disable no-unused-vars */
/* global jest describe test expect mount */

import React from 'react'
import { SelectTool } from './SelectTool';

jest.useFakeTimers();

describe('SelectTool test set', () => {
  test('SelectTool renders properly', () => {
    let selectTool = mount(<SelectTool />);
    expect(selectTool).toMatchSnapshot();
    expect(selectTool.instance().canvas).toBeTruthy();
  });
  test('Mouse events working correctly', () => {
    const spy = jest.spyOn(SelectTool.prototype, 'findxy');
    const selectTool = mount(<SelectTool changeMouseType={{ mouseType: 'select' }} />);
    selectTool.simulate('mousemove', { preventDefault: () => true })
    expect(spy).toBeCalled();
    selectTool.simulate('mousedown', { preventDefault: () => true })
    expect(spy).toBeCalled();
    selectTool.simulate('mouseup', { preventDefault: () => true })
    expect(spy).toBeCalled();
    selectTool.simulate('mouseout', { preventDefault: () => true })
    expect(spy).toBeCalled();
  });
  test('findxy can handle move', () => {
    const selectTool = mount(<SelectTool changeMouseType={{ mouseType: 'select' }} />);
    const ev = {
      clientX: 200,
      clientY: 200
    };
    selectTool.instance().flag = true;
    selectTool.instance().findxy('move', ev);
    expect(selectTool.instance().currY).toEqual(200);
  });
  test('drawing invoke marching ants', () => {
    const selectTool = mount(<SelectTool changeMouseType={{ mouseType: 'select' }} />);
    selectTool.instance().draw(6);
    expect(setTimeout).toHaveBeenCalledTimes(2);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 100);
  });
});
