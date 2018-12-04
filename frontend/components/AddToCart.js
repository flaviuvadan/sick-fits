import React from 'react';
import { Mutation } from 'react-apollo';
import { ADD_TO_CART_MUTATION } from "../queries/queries";


export default class AddToCart extends React.Component {
	render() {
		const { id } = this.props;
		return (
			<Mutation mutation={ADD_TO_CART_MUTATION} variables={{
				id: id
			}}>
				{(addToCart) => {
					return <button onClick={addToCart}>Add To Cart</button>
				}}
			</Mutation>
		);
	}
};
