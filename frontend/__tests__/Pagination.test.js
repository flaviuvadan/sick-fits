import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import Router from 'next/router';
import Pagination from '../components/Pagination';
import { PAGINATION_QUERY } from "../queries/queries";
import { MockedProvider } from 'react-apollo/test-utils';


// edit the Router function push and prefetch and make them do nothing
// this comes from the docs of Router on how to mock out calls
Router.router = {
	push() {},
	prefetch() {},
};

function makeMocksFor(numberOfItems) {
	return [
		{
			request: {
				query: PAGINATION_QUERY,
			},
			result: {
				data: {
					itemsConnection: {
						__typename: 'aggregate',
						aggregate: {
							__typename: 'count',
							count: numberOfItems,
						},
					},
				},
			},
		},
	];
}

describe('<Pagination/>', () => {
	it('displays a loading message', () => {
		const wrapper = mount(
			<MockedProvider mocks={makeMocksFor(1)}>
				<Pagination page={1}/>
			</MockedProvider>
		);
		expect(wrapper.text()).toContain('Loading...');
	});

	it('renders pagination for items', async () => {
		const wrapper = mount(
			<MockedProvider mocks={makeMocksFor(18)}>
				<Pagination page={1}/>
			</MockedProvider>
		);
		await wait();
		wrapper.update();
		expect(wrapper.find('.totalPages').text()).toEqual('5');

		const pagination = wrapper.find('div[data-test="pagination"]');
		expect(toJSON(pagination)).toMatchSnapshot();
	});

	it('disables prev button on the first page', async () => {

	});

	it('disables next button on the last page', async () => {

	});

	it('enables all buttons on the middle page', async () => {

	});
});