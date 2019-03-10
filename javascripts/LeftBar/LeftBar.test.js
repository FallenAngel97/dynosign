import React from 'react';
import { LeftBar, mapDispatchToProps } from './LeftBar';

describe("LeftBar tests", () => {
    beforeAll(()=> {
        global.color = {
            r: '241',
            g: '112',
            b: '19',
            a: '1',
        };
    });
    test("LeftBar can trigger 'switch mouse type'", () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch)._changeMouseType("select");
        expect(dispatch.mock.calls[0][0]).toEqual(
            { type: 'CHANGE_MOUSE_TYPE', mouseType: "select" }
        );
        const _changeType = jest.fn();
        const wrapper = mount(<LeftBar 
            changeColor={{color}}
            changeMouseType={{mouseType: 'default'}} 
            _changeMouseType={_changeType} />);
        wrapper.instance().changeCursor("default");
        expect(_changeType).toBeCalledWith("default")
    });
    test("LeftBar default cursor", () => {
        const wrapper = mount(<LeftBar changeColor={{color}} changeMouseType={{mouseType: 'default'}} />);
        wrapper.instance().changeCursor = jest.fn();
        wrapper.update();
        wrapper.find(".buttonWrapper > img").first().simulate('click');
        expect(wrapper.instance().changeCursor).toBeCalledWith('default');
    });
    test("LeftBar select cursor", () => {
        const wrapper = mount(<LeftBar changeColor={{color}} changeMouseType={{mouseType: 'default'}} />);
        wrapper.instance().changeCursor = jest.fn();
        wrapper.update();
        wrapper.find(".buttonWrapper > img").at(1).simulate('click');
        expect(wrapper.instance().changeCursor).toBeCalledWith('select');
    });
    test("LeftBar text cursor", () => {
        const wrapper = mount(<LeftBar changeColor={{color}} changeMouseType={{mouseType: 'default'}} />);
        wrapper.instance().changeCursor = jest.fn();
        wrapper.update();
        wrapper.find(".buttonWrapper > img").at(2).simulate('click');
        expect(wrapper.instance().changeCursor).toBeCalledWith('text');
    });
    test("LeftBar draw cursor", () => {
        const wrapper = mount(<LeftBar changeColor={{color}} changeMouseType={{mouseType: 'default'}} />);
        wrapper.instance().changeCursor = jest.fn();
        wrapper.update();
        wrapper.find(".buttonWrapper > img").at(3).simulate('click');
        expect(wrapper.instance().changeCursor).toBeCalledWith('draw');
    });
    test("LeftBar circle cursor", () => {
        const wrapper = mount(<LeftBar changeColor={{color}} changeMouseType={{mouseType: 'default'}} />);
        wrapper.instance().changeCursor = jest.fn();
        wrapper.update();
        wrapper.find(".buttonWrapper > img").at(4).simulate('click');
        expect(wrapper.instance().changeCursor).toBeCalledWith('circle');
    });
    test("LeftBar should render properly", () => {

        let leftbar = shallow(<LeftBar changeColor={{color}} changeMouseType={{mouseType: 'default'}} />);
        expect(leftbar).toMatchSnapshot();
        leftbar = shallow(<LeftBar changeColor={{color}} changeMouseType={{mouseType: 'text'}} />);
        expect(leftbar).toMatchSnapshot();
        leftbar = shallow(<LeftBar changeColor={{color}} changeMouseType={{mouseType: 'circle'}} />);
        expect(leftbar).toMatchSnapshot();
        leftbar = shallow(<LeftBar changeColor={{color}} changeMouseType={{mouseType: 'draw'}} />);
        expect(leftbar).toMatchSnapshot();
        leftbar = shallow(<LeftBar changeColor={{color}} changeMouseType={{mouseType: 'select'}} />);
        expect(leftbar).toMatchSnapshot();
    });
});
