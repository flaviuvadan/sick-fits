import { mount } from 'enzyme';
import Router from 'next/router';
import NProgress from 'nprogress';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import Order from '../components/Order';
import { ORDER_QUERY } from "../queries/queries";
import { fakeOrder } from "../lib/testUtils";

const mocks = [
	{
		request: {
			query: ORDER_QUERY,
			variables: {
				id: "ord123",
			},
		},
		result: {
			data: {
				order: {
					...fakeOrder(),
				},
			},
		},
	},
];

describe('<Order/>', () => {
	it('renders', async () => {
		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				<Order id="ord123"/>
			</MockedProvider>
		);
		await wait();
		wrapper.update();
		const order = wrapper.find('[data-test="order"]');

		// the snapshot also checks values on the page
		expect(toJSON(order)).toMatchSnapshot();
	});
});
