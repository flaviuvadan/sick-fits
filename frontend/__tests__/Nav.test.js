import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import Nav from '../components/Nav';
import { CURRENT_USER_QUERY } from "../queries/queries";
import { MockedProvider } from 'react-apollo/test-utils';
import { fakeUser, fakeCartItem } from "../lib/testUtils";


const notSignedInMocks = [
	{
		request: {
			query: CURRENT_USER_QUERY,
		},
		result: {
			data: {
				currentUser: null,
			},
		},
	},
];

const signedInMocks = [
	{
		request: {
			query: CURRENT_USER_QUERY,

		},
		result: {
			data: {
				currentUser: fakeUser(),
			},
		},
	},
];

const signedInMocksWithCartItems = [
	{
		request: {
			query: CURRENT_USER_QUERY,

		},
		result: {
			data: {
				currentUser: {
					...fakeUser(),
					cart: [fakeCartItem(), fakeCartItem(), fakeCartItem()],
				}
			},
		},
	},
];

describe('<Nav/>', () => {
	it('renders a minimal tab when signed out', async () => {
		const wrapper = mount(
			<MockedProvider mocks={notSignedInMocks}>
				<Nav/>
			</MockedProvider>
		);
		await wait();
		wrapper.update();
		const nav = wrapper.find('[data-test="nav"]');
		expect(toJSON(nav)).toMatchSnapshot();
	});

	it('renders full nav when signed in', async () => {
		const wrapper = mount(
			<MockedProvider mocks={signedInMocks}>
				<Nav/>
			</MockedProvider>
		);
		await wait();
		wrapper.update();
		const nav = wrapper.find('ul[data-test="nav"]');
		expect(nav.children().length).toBe(6);
		expect(nav.text()).toContain('Sign Out');
	});

	it('renders number of cart items in nav', async () => {
		const wrapper = mount(
			<MockedProvider mocks={signedInMocksWithCartItems}>
				<Nav/>
			</MockedProvider>
		);
		await wait();
		wrapper.update();
		const nav = wrapper.find('ul[data-test="nav"]');
		const count = nav.find('CartCount');
		expect(toJSON(count)).toMatchSnapshot();
	});

	it('renders all nav headers', async () => {
		const wrapper = mount(
			<MockedProvider mocks={signedInMocksWithCartItems}>
				<Nav/>
			</MockedProvider>
		);
		await wait();
		wrapper.update();
		const nav = wrapper.find('ul[data-test="nav"]');
		console.log(nav.debug());
		expect(nav.contains('Shop')).toBe(true);
		expect(nav.contains('Sell')).toBe(true);
		expect(nav.contains('Orders')).toBe(true);
		expect(nav.contains('Account')).toBe(true);
		expect(nav.contains('My Cart')).toBe(true);
		expect(toJSON(nav)).toMatchSnapshot();
	})
});