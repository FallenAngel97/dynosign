import { configure, shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { defaultLayer } from '../javascripts/reducers';

configure({ adapter: new Adapter() })

global.shallow = shallow;
global.render = render;
global.mount = mount;

global.defaultLayer = defaultLayer
