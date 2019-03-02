import React from "react";
import { Layer, mapDispatchToProps } from "./Layer";
import { configure, shallow, render} from "enzyme"
import Adapter from 'enzyme-adapter-react-16';

const defaultLayer = {
    opacity: 100,
    name: 'New layer',
    hidden: false,
    linesArray: []
}

configure({ adapter: new Adapter() })

describe("Layer component", () => {
    test("Layer should render properly", () => {
        const layer = shallow(<Layer changeActiveLayer={{layerNumber: 0}} layer={{name: 'Layer 0'}}  />);
        expect(layer).toMatchSnapshot();
    });
    test("Layer should allow editing", () => {
        const wrapper = shallow(<Layer changeActiveLayer={{layerNumber: 0}} layer={{name: 'Layer 0'}} />);
        wrapper.simulate('dblclick');
        expect(wrapper.state().editLayer).toEqual(true);
    });
    test("Layer component can trigger 'change active layer'", () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch)._changeActiveLayer(defaultLayer, 1);
        expect(dispatch.mock.calls[0][0]).toEqual(
            { type: 'CHANGE_ACTIVE_LAYER', layer: defaultLayer, layerNumber: 1}
        );
    });
    test("Layer component can trigger 'change layer'", () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).changeLayer(defaultLayer, 1);
        expect(dispatch.mock.calls[0][0]).toEqual(
            { type: 'CHANGE_LAYER', layer: defaultLayer, layerId: 1}
        );
    });
    test("Layer component can trigger 'change layer visibility'", () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).changeLayerVisibility(true, 1);
        expect(dispatch.mock.calls[0][0]).toEqual(
            {type: 'CHANGE_LAYER_VISIBILITY', hidden: true, layerNumber: 1}
        );
    });
    test("Layer should allow renaming", () => {
        const wrapper = shallow(<Layer changeActiveLayer={{layerNumber: 0}} layer={{name: 'Layer 0'}}  />);
        wrapper.instance().renameLayer();
        expect(wrapper.state().editLayer).toEqual(true);
    });
    test("Layer should handle click", () => {
        const wrapper = shallow(<Layer changeActiveLayer={{layerNumber: 0}} layer={{name: 'Layer 0'}}  />);
        wrapper.simulate('click');
        expect(wrapper.state().editLayer).toEqual(false);
    });
});