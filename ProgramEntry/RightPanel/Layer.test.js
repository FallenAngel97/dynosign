/* global mount shallow defaultLayer */
import React from 'react';
import { Layer, mapDispatchToProps } from './Layer';

describe('Layer component', () => {
  test('Layer should render properly', () => {
    const layer = shallow(<Layer changeActiveLayer={{ layerNumber: 0 }} layer={{ name: 'Layer 0' }} />);
    expect(layer).toMatchSnapshot();
    const layerMounted = mount(<Layer changeActiveLayer={{ layerNumber: 0 }} layer={{ name: 'Layer 0' }} />);
    expect(layerMounted.instance().node).toBeTruthy();
  });
  test('Layer should allow editing', () => {
    const changeLayer = jest.fn();
    const layer = { name: 'Layer 0' };
    const wrapper = shallow(<Layer changeLayer={changeLayer} changeActiveLayer={{ layerId: 0, layer }} layer={layer} />);
    wrapper.simulate('dblclick');
    expect(wrapper.state().editLayer).toBeTruthy();
    const ev = {
      target: {
        value: 'Layer 1'
      }
    };
    wrapper.instance().layerNameChange(ev);
    expect(changeLayer).toHaveBeenCalledWith(layer, 0)
  });
  test("Layer component can trigger 'change active layer'", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch)._changeActiveLayer(defaultLayer, 1);
    expect(dispatch.mock.calls[0][0]).toEqual(
      { type: 'CHANGE_ACTIVE_LAYER', layer: defaultLayer, layerNumber: 1 }
    );
  });
  test("Layer component can trigger 'change layer'", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).changeLayer(defaultLayer, 1);
    expect(dispatch.mock.calls[0][0]).toEqual(
      { type: 'CHANGE_LAYER', layer: defaultLayer, layerId: 1 }
    );
  });
  test("Layer component can trigger 'change layer visibility'", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).changeLayerVisibility(true, 1);
    expect(dispatch.mock.calls[0][0]).toEqual(
      { type: 'CHANGE_LAYER_VISIBILITY', hidden: true, layerNumber: 1 }
    );
    const changeLayerVisibility = jest.fn();
    const wrapper = shallow(<Layer layerId={0} changeLayerVisibility={changeLayerVisibility}
      changeActiveLayer={{ layerId: 0, defaultLayer }} layer={defaultLayer} />);
    wrapper.instance().changeVisibility();
    expect(changeLayerVisibility).toHaveBeenCalledWith(!defaultLayer.hidden, 0)
  });
  test('Layer should allow renaming', () => {
    const wrapper = shallow(<Layer changeActiveLayer={{ layerNumber: 0 }} layer={{ name: 'Layer 0' }} />);
    wrapper.instance().renameLayer();
    expect(wrapper.state().editLayer).toBeTruthy();
  });
  test('checks for mouse click on document', () => {
    global.document.removeEventListener = jest.fn();
    const wrapper = shallow(<Layer changeActiveLayer={{ layerNumber: 0 }} layer={{ name: 'Layer 0' }} />);
    wrapper.unmount()
    expect(global.document.removeEventListener).toHaveBeenCalled();
  });
});
