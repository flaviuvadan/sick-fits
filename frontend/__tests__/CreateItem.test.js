import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import Router from 'next/router';
import { MockedProvider } from 'react-apollo/test-utils';
import CreateItem from '../components/CreateItem';
import { CREATE_ITEM_MUTATION } from "../queries/queries";
import { fakeItem } from "../lib/testUtils";


// mock global fetches, a global browser API
const mockUrl = 'www.starman.com';
global.fetch = jest.fn().mockResolvedValue({
	json: () => ({
		secure_url: mockUrl,
		eager: [
			{
				secure_url: mockUrl,
			},
		],
	}),
});

describe('<CreateItem/>', () => {
	it('renders and matches snapshot', async () => {
		const wrapper = mount(
			<MockedProvider>
				<CreateItem/>
			</MockedProvider>
		);
		const form = wrapper.find('[data-test="form"]');
		expect(toJSON(form)).toMatchSnapshot();
	});

	it('uploads a file when changed', async () => {
		const wrapper = mount(
			<MockedProvider>
				<CreateItem/>
			</MockedProvider>
		);
		const input = wrapper.find('input[type="file"]');
		const event = {
			target: {
				files: ['startman.jpg'],
			},
		};
		input.simulate('change', event);
		await wait();

		// can grab a singular instance of a component at a time to check state
		const component = wrapper.find('CreateItem').instance();
		expect(component.state.image).toEqual(mockUrl);
		expect(component.state.largeImage).toEqual(mockUrl);
		expect(global.fetch).toHaveBeenCalled();
		global.fetch.mockReset();
	});

	it('handles state updating', async () => {
		const wrapper = mount(
			<MockedProvider>
				<CreateItem/>
			</MockedProvider>
		);
		const titleEvent = {
			target: {
				value: 'Starman',
				name: 'title',
			},
		};
		const priceEvent = {
			target: {
				value: 42,
				name: 'price',
			},
		};
		const descriptionEvent = {
			target: {
				value: 'Starman',
				name: 'description',
			},
		};

		wrapper.find('#title').simulate('change', titleEvent);
		wrapper.find('#price').simulate('change', priceEvent);
		wrapper.find('#description').simulate('change', descriptionEvent);

		expect(wrapper.find('CreateItem').instance().state).toMatchObject({
			title: 'Starman',
			price: 42,
			description: 'Starman',
		});
	});

	it('creates an item when the form is submitted', async () => {
		const item = fakeItem();
		const mocks = [
			{
				request: {
					query: CREATE_ITEM_MUTATION,
					variables: {
						title: item.title,
						description: item.description,
						image: '',
						largeImage: '',
						price: item.price,
					},
				},
				result: {
					data: {
						createItem: {
							id: 'star123',
							...fakeItem,
							__typename: 'item',
						}
					},
				},
			},
		];
		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				<CreateItem/>
			</MockedProvider>
		);
		const titleEvent = {
			target: {
				value: item.title,
				name: 'title',
			},
		};
		const priceEvent = {
			target: {
				value: item.price,
				name: 'price',
			},
		};
		const descriptionEvent = {
			target: {
				value: item.description,
				name: 'description',
			},
		};
		// simulate form fill-out
		wrapper.find('#title').simulate('change', titleEvent);
		wrapper.find('#price').simulate('change', priceEvent);
		wrapper.find('#description').simulate('change', descriptionEvent);

		// mock router
		Router.router = {
			push: jest.fn(),
		};

		// simulate submit
		wrapper.find('form').simulate('submit');
		await wait(50);

		expect(Router.router.push).toHaveBeenCalled();
		const expectedParams = {
			"pathname": "/item",
			"query": {
				"id": "star123",
			},
		};
		expect(Router.router.push).toHaveBeenCalledWith(expectedParams);
	});
});