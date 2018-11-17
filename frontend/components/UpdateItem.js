import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { ITEM_QUERY, UPDATE_ITEM_MUTATION } from "../queries/queries";


class UpdateItem extends Component {
	state = {};

	/**
	 * Handle changes to state
	 * Arrow functions allow you to by-pass the need to instantiate an ES6 function and bind it to CreateItem in a
	 * constructor
	 * @param e - DOM event
	 */
	handleChange = e => {
		const { name, type, value } = e.target;
		const val = type === 'number' ? parseFloat(value) : value;
		this.setState({ [name]: val });
	};

	/**
	 * Update an item
	 * @param e - DOM event
	 * @param updateItemMutation - mutation
	 */
	updateItem = async (e, updateItemMutation) => {
		e.preventDefault();
		 await updateItemMutation({
			variables: {
				id: this.props.id,
				...this.state,
			},
		});
	};

	render() {
		return (
			<Query
				query={ITEM_QUERY}
				variables={{
					id: this.props.id,
				}}
			>
				{({ data, loading }) => {
					if (loading) return <p>Loading...</p>;
					if (!data.item) return <p>No Item Found for ID {this.props.id}</p>;
					return (
						<Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
							{(updateItem, { loading, error }) => (
								<Form onSubmit={e => this.updateItem(e, updateItem)}>
									<Error error={error}/>
									<fieldset disabled={loading} aria-busy={loading}>
										<label htmlFor="title">
											Title
											<input
												type="text"
												id="title"
												name="title"
												placeholder="Title"
												required
												defaultValue={data.item.title}
												onChange={this.handleChange}
											/>
										</label>

										<label htmlFor="price">
											Price
											<input
												type="number"
												id="price"
												name="price"
												placeholder="Price"
												required
												defaultValue={data.item.price}
												onChange={this.handleChange}
											/>
										</label>

										<label htmlFor="description">
											Description
											<textarea
												id="description"
												name="description"
												placeholder="Enter A Description"
												required
												defaultValue={data.item.description}
												onChange={this.handleChange}
											/>
										</label>
										<button type="submit">Sav{loading ? 'ing' : 'e'} Changes</button>
									</fieldset>
								</Form>
							)}
						</Mutation>
					);
				}}
			</Query>
		);
	}
}

export default UpdateItem;