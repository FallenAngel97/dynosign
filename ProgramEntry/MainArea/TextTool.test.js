/* global mount */
import React from 'react';
import { TextTool } from './TextTool';

describe('TextTool test set', () => {
  it('should render properly', () => {
    const textTool = mount(<TextTool changeFont={{ font: { label: 'Helvetica' } }} />);
    expect(textTool).toMatchSnapshot()
    expect(textTool.instance().textWrapper).toBeTruthy();
  });
  it('should add textbox on click', () => {
    const addText = TextTool.prototype.addText = jest.fn();
    const textTool = mount(<TextTool changeFont={{ font: { label: 'Helvetica' } }} />);
    textTool.find('#text_tool_drawing_area').simulate('click');
    expect(addText).toHaveBeenCalled();
  });
});
