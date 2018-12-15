import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import SingleItem from '../components/SingleItem';
import { ITEM_QUERY } from "../queries/queries";
import { MockedProvider } from 'react-apollo/test-utils';
import { fakeItem } from "../lib/testUtils";

describe('<SingleItem/>', () => {
	it('renders with proper data', async () => {
		const fakeId = '123';
		// pairs of requests and results
		// when a request matches the request in mocks, return the specified result
		// can specify a delay: N ms
		const mocks = [
			{
				request: {
					query: ITEM_QUERY,
					variables: {
						id: fakeId,
					}
				},
				result: {
					data: {
						item: fakeItem(),
					}
				}
			}
		];
		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				<SingleItem id={'123'}/>
			</MockedProvider>
		);
		expect(wrapper.text()).toContain('Loading...');
		await wait();
		wrapper.update();
		expect(toJSON(wrapper.find('h2'))).toMatchSnapshot();
		expect(toJSON(wrapper.find('img'))).toMatchSnapshot();
		expect(toJSON(wrapper.find('p'))).toMatchSnapshot();
	});

	it('errors with not found item', async () => {
		const fakeId = '123';
		const mocks = [
			{
				request: {
					query: ITEM_QUERY,
					variables: {
						id: fakeId,
					}
				},
				result: {
					errors: [
						{
							message: 'Item not found',
						},
					],
				},
			}
		];
		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				<SingleItem id={'123'}/>
			</MockedProvider>
		);
		await wait();
		wrapper.update();
		const item = wrapper.find('[data-test="graphql-error"]');
		expect(item.text()).toContain('Item not found');
		expect(toJSON(item)).toMatchSnapshot();
	});
});