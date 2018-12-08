import React from 'react';
import Downshift from 'downshift';
import Router from 'next/router';
import debounce from 'lodash.debounce';
import { ApolloConsumer } from 'react-apollo';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';
import { SEARCH_ITEMS_QUERY } from "../queries/queries";


class AutoComplete extends React.Component {

	/**
	 * Handles event changes
	 * @param e - event (keyboard input)
	 * @param client -
	 */
	async onChange(e, client) {
		// manually query Apollo client
		const response = await client.query({
			query: SEARCH_ITEMS_QUERY,
			variables: {
				searchTerm: e.target.value,
			}
		});
		console.log(response)
	};

	render() {
		return (
			<SearchStyles>
				<div>
					<ApolloConsumer>
						{(client) => (
							<input type="search" onChange={(e) => {
								e.persist();
								// Apollo consumer exposes client and when someone types we can pass e to sep function
								this.onChange(e, client);
							}}/>
						)}
					</ApolloConsumer>
					<DropDown>
						<p>Items</p>
					</DropDown>
				</div>
			</SearchStyles>
		)
	}
}

export default AutoComplete;