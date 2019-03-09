import React from "react";
import { TextTool } from "./TextTool";

describe("TextTool test set", () => {
    it("should render properly", () => {
        const textTool = shallow(<TextTool />);
        expect(textTool).toMatchSnapshot()
    });
});
