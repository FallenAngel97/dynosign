import React from "react";
import { Layer } from "./Layer";
import { configure, shallow} from "enzyme"
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() })

describe("Layer component", () => {
    test("Layer should allow editing", () => {
        const wrapper = shallow(<Layer changeActiveLayer={{layerNumber: 0}} layer={{name: 'Layer 0'}} />);
        wrapper.simulate('dblclick');
        expect(wrapper.state().editLayer).toEqual(true);
    });
});