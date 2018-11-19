import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Router from 'next/router';

import { CREATE_ITEM_MUTATION } from '../queries/queries';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

// CRUD - create, read, update, delete
class CreateItem extends Component {
	state = {
		title: '',
		description: '',
		image: '',
		largeImage: '',
		price: 0,
	};

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

	/**
	 * Responsible for uploading images to Cloudinary
	 * @param e - DOM event
	 */
	uploadFile =  async e => {
		const files = e.target.files;
		const data = new FormData();
		data.append('file', files[0]);
		data.append('upload_preset', 'sick-fits');
		const payload = { method: 'POST', body: data };
		const res = await fetch('https://api.cloudinary.com/v1_1/vflav/image/upload', payload);
		const file = await res.json();
		this.setState({ image: file.secure_url, largeImage: file.eager[0].secure_url });
	};

	render() {
		return (
			<Mutation mutation={CREATE_ITEM_MUTATION}
					  // refetchQueries can be used to refetch a set of queries based on CREATE_ITEM_MUTATION execution
				      // has the potential to refetch hundreds of pages if there are that many in cache
					  // refetchQueries={}
					  variables={this.state}>
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
							<label htmlFor="file">
								Image
								<input type="file"
									   id="file"
									   name="file"
									   placeholder="Upload an image"
									   required
									   onChange={this.uploadFile}
								/>
								{this.state.image && <img src={this.state.image} alt="Upload preview"/>}
							</label>
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
		);
	}
}

export default CreateItem;