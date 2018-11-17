import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import { DELETE_ITEM_MUTATION } from '../queries/queries';


class DeleteItem extends Component {
	render() {
		return (
			<Mutation mutation={DELETE_ITEM_MUTATION} variables={{ id: this.props.id }}>
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