import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import Router from 'next/router';

import { ITEM_QUERY } from '../queries/queries';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

// CRUD - create, read, update, delete
class UpdateItem extends Component {
	// will use state to only keep track of updated fields, init to empty object
	state = {};

	/**
	 * Handle changes to state
	 * Arrow functions allow you to by-pass the need to instantiate an ES6 function and bind it to CreateItem in a
	 * constructor
	 * @param e - DOM event
	 */
	handleChange = (e) => {
		// get the inputs from the target, use syntactic sugar
		const { name, type, value } = e.target;
		const val = type === 'number' ? parseFloat(value) : value;
		this.setState({ [name]: val });
	};

	render() {
		return (
			<Query query={ITEM_QUERY} variables={{ id: this.props.id }}>
				{({ data, loading }) => {
					if (loading) return <p>Loading...</p>;

					return (
						<Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
							{(createItem, { error, loading }) => (
								<Form onSubmit={async e => {
									// prevent default behaviour of placing string as query params
									// we get the state in this
									e.preventDefault();
									// call mutation and go to the item's page
									const res = await createItem();
									Router.push({
										pathname: '/item',
										query: { id: res.data.createItem.id }
									})
								}}>
									<Error error={error}/>
									<fieldset disabled={loading} aria-busy={loading}>
										<label htmlFor="title">
											Title
											<input type="text"
												   id="title"
												   name="title"
												   placeholder="Title"
												   required
												   value={this.state.title}
												   onChange={this.handleChange}
											/>
										</label>
										<label htmlFor="price">
											Price
											<input type="number"
												   id="price"
												   name="price"
												   placeholder="Price"
												   required
												   value={this.state.price}
												   onChange={this.handleChange}
											/>
										</label>
										<label htmlFor="description">
											Description
											<textarea
												id="description"
												name="description"
												placeholder="Description"
												required
												value={this.state.description}
												onChange={this.handleChange}
											/>
										</label>
										<button type="submit">Submit</button>
									</fieldset>
								</Form>
							)}
						</Mutation>
					)
				}}
			</Query>
		);
	}
}

export default UpdateItem;