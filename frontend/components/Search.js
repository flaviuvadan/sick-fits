import React from 'react';
import Downshift, { resetIdCounter } from 'downshift';
import Router from 'next/router';
import debounce from 'lodash.debounce';
import { ApolloConsumer } from 'react-apollo';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';
import { SEARCH_ITEMS_QUERY } from "../queries/queries";


/**
 * Routes to selected item search result
 * @param item - item
 */
function routeToItem(item) {
	Router.push({
		pathname: '/item',
		query: {
			id: item.id,
		},
	});
}

class AutoComplete extends React.Component {
	state = {
		items: [],
		loading: false,
	};

	/**
	 * Handles event changes (debounced by 350ms)
	 * @param e - event (keyboard input)
	 * @param client - Apollo client
	 */
	onChange = debounce(async (e, client) => {
		this.setState({ loading: true });
		// manually query Apollo client
		const response = await client.query({
			query: SEARCH_ITEMS_QUERY,
			variables: {
				searchTerm: e.target.value,
			}
		});
		this.setState({
			items: response.data.items,
			loading: false
		});
	}, 350);

	render() {
		// Downshift keeps a back-end counter for renders but it provides the ability to reset the counter manually, so
		// one does not get console warnings 
		resetIdCounter();
		return (
			<SearchStyles>
				<Downshift onChange={routeToItem} itemToString={item => (item === null ? '' : item.title)}>
					{({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex }) => (
						<div>
							<ApolloConsumer>
								{(client) => (
									<input
										type="search"
										{...getInputProps({
											type: 'search',
											placeholder: 'Search for an item',
											id: 'search',
											className: this.state.loading ? 'loading' : '',
											onChange: e => {
												// maintain the state of the event, o/w will not have access in debounce
												// (onChange) because it will be gone by the time onChange does stuff to
												// to it
												e.persist();
												// Apollo consumer exposes client and when someone types we can pass e to sep function
												this.onChange(e, client);
											}
										})}
									/>
								)}
							</ApolloConsumer>

							{isOpen && (
								<DropDown>
									{this.state.items.map((item, index) => (
											<DropDownItem
												{...getItemProps({ item })}
												key={item.id}
												highlighted={index === highlightedIndex}
											>
												<img width="50" src={item.image} alt={item.title}/>
												{item.title}
											</DropDownItem>
										)
									)}
									{!this.state.items.length && !this.state.loading && (
										<DropDownItem>Nothing found for {inputValue}</DropDownItem>
									)}
								</DropDown>
							)}
						</div>
					)}
				</Downshift>
			</SearchStyles>
		);
	}
}

export default AutoComplete;