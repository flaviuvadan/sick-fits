import { mount } from 'enzyme';
import Router from 'next/router';
import NProgress from 'nprogress';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import Charge from '../components/Charge';
import { CURRENT_USER_QUERY } from "../queries/queries";
import { fakeUser, fakeCartItem } from "../lib/testUtils";


Router.router = {
	push() {
	},
};

const mocks = [
	{
		request: {
			query: CURRENT_USER_QUERY,
		},
		result: {
			data: {
				currentUser: {
					...fakeUser(),
					cart: [fakeCartItem()],
				},
			},
		},
	},
];

describe('<Charge/>', () => {
	it('renders', async () => {
		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				<Charge/>
			</MockedProvider>
		);
		await wait();
		wrapper.update();
		const checkoutButton = wrapper.find('ReactStripeCheckout');
		expect(toJSON(checkoutButton)).toMatchSnapshot();
	});

	it('creates an order ontoken', async () => {
		const createOrderMock = jest.fn().mockResolvedValue({
			data: {
				createOrder: {
					id: 'abc123',
				},
			},
		});
		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				<Charge/>
			</MockedProvider>
		);
		const component = wrapper.find('Charge').instance();
		//manually call onToken
		component.onToken({ id: 'abc123' }, createOrderMock);
		expect(createOrderMock).toHaveBeenCalled();
		expect(createOrderMock).toHaveBeenCalledWith({ "variables": { "token": "abc123" } });
	});

	it('turns progress bar on', async () => {
		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				<Charge/>
			</MockedProvider>
		);
		await wait();
		wrapper.update();
		NProgress.start = jest.fn();
		const createOrderMock = jest.fn().mockResolvedValue({
			data: {
				createOrder: {
					id: 'abc123',
				},
			},
		});
		const component = wrapper.find('Charge').instance();
		//manually call onToken
		component.onToken({ id: 'abc123' }, createOrderMock);
		expect(NProgress.start).toHaveBeenCalled();
		expect(createOrderMock).toHaveBeenCalled();
		expect(createOrderMock).toHaveBeenCalledWith({ "variables": { "token": "abc123" } });
	});

	it('routes to order page when completed', async () => {
		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				<Charge/>
			</MockedProvider>
		);
		await wait();
		wrapper.update();
		const createOrderMock = jest.fn().mockResolvedValue({
			data: {
				createOrder: {
					id: 'abc123',
				},
			},
		});
		const component = wrapper.find('Charge').instance();

		Router.router.push = jest.fn();
		component.onToken({ id: 'abc123' }, createOrderMock);

		await wait();
		expect(Router.router.push).toHaveBeenCalled();
		expect(Router.router.push).toHaveBeenCalledWith({ "pathname": "/order", "query": { "id": "abc123" } });
	});
});