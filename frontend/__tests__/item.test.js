// shallow render top-level component, do not go to children components because they have individual tests
import { shallow } from 'enzyme';
import Item from '../components/Item';

const fakeItem = {
	id: 'ABC123',
	title: 'An item',
	price: '5000',
	description: 'This is an item',
	image: 'item.jpg',
	largeImage: 'itemLarge.jpg',
};

// can also separate the it()s in describe() into multiple tests for checking different component parts
// e.g PriceTag, Title a, etc.
describe('<Item/>', () => {
	it('renders and displays properly', () => {
		const wrapper = shallow(<Item item={fakeItem}/>);
		// to display the full wrapper HTML component, use wrapper.debug()
		// console.log(wrapper.debug());

		const priceTag = wrapper.find('PriceTag');
		// can perform a dive on shallow-rendered components
		// console.log(priceTag.dive().text());
		expect(priceTag.children().text()).toBe('$50');

		// can get Title along with anchor tag <a/>
		const title = wrapper.find('Title a');
		expect(title.text()).toBe(fakeItem.title);

		const image = wrapper.find('img');
		expect(image.props().src).toEqual(fakeItem.image);
		expect(image.props().alt).toEqual(fakeItem.title);
	});

	it('renders out buttons properly', () => {
		const wrapper = shallow(<Item item={fakeItem}/>);
		const buttonList = wrapper.find('.buttonList');
		expect(buttonList.children()).toHaveLength(3);
		expect(buttonList.find('Link').exists()).toBeTruthy();
		expect(buttonList.find('AddToCart').exists()).toBeTruthy();
		expect(buttonList.find('DeleteItem').exists()).toBeTruthy();
	});
});