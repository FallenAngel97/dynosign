/* global shallow */
import React from 'react';
import RectangleSettings from './RectangleSettings';

describe('RectangleSettings test', () => {
  it('should render properly', () => {
    const rectangleSettings = shallow(<RectangleSettings />);
    expect(rectangleSettings).toMatchSnapshot();
  });
});
