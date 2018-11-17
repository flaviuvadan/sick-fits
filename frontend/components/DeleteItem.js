import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import { ALL_ITEMS_QUERY, DELETE_ITEM_MUTATION } from '../queries/queries';

class DeleteItem extends Component {

	/**
	 * Page update method
	 * @param cache - Apollo cache access
	 * @param payload - deleted item, returned by Apollo
	 */
	update = (cache, payload) => {
		// manually update cache on client side so it matches server
		// read the cache for the item we want (search)
		const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
		// filter deleted item out of page cache
		data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id);
		// place items back
		cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
	};

	render() {
		return (
			<Mutation mutation={DELETE_ITEM_MUTATION} variables={{ id: this.props.id }} update={this.update}>
				{(deleteItem, { error }) => (
					<button onClick={() => {
						if (confirm('Are you sure you want to delete this?')) {
							deleteItem();
						}
					}}>{this.props.children}</button>
				)}
			</Mutation>
		);
	}
}

export default DeleteItem;