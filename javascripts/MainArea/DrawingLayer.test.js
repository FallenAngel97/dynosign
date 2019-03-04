import React from "react";
import {mapDispatchToProps, DrawingLayer} from "./DrawingLayer";
import { configure, shallow, mount} from "enzyme"
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() })
HTMLCanvasElement.prototype.toDataURL = () => {
    return 'canvas-data-url';
}

describe("DrawingLayer test set", () => {
    test("DrawingLayer can add line", () => {
        const dispatch = jest.fn();
        const canvas = document.createElement('canvas');
        const layerNumber = 2;
        const expectedAction = {
            type: 'ADD_LINE', lineData: canvas.toDataURL(), layerNumber
        }
        mapDispatchToProps(dispatch).addLine(canvas, layerNumber);
        expect(dispatch.mock.calls[0][0]).toEqual(expectedAction);
    });
    test("DrawingLayer renders properly", () => {
        const layer = mount(<DrawingLayer />);
        expect(layer).toMatchSnapshot();
        expect(layer.instance().canvas).toBeTruthy();
    });
});