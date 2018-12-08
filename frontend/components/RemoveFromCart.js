import React from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY, REMOVE_FROM_CART_MUTATION } from "../queries/queries";


const RemoveButton = styled.button`
	font-size: 3rem;
	background: none;
	border: 0;
	
	&:hover {
		color: ${props => props.theme.red};
		cursor: pointer;
	}
`;

class RemoveFromCart extends React.Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
	};

	/**
	 * Called upon a response from the back-end
	 * @param cache - Apollo cache
	 * @param payload - content (item id from resolved mutation)
	 */
	update = (cache, payload) => {
		// read cache
		const data = cache.readQuery({ query: CURRENT_USER_QUERY });
		// remove item from cart
		const cartItemId = payload.data.removeFromCart.id;
		// write back to cache
		data.currentUser.cart = data.currentUser.cart.filter(cartItem => cartItem.id !== cartItemId);
		cache.writeQuery({ query: CURRENT_USER_QUERY, data });
	};

	render() {
		return (
			<Mutation
				mutation={REMOVE_FROM_CART_MUTATION}
				variables={{ id: this.props.id }}
				update={this.update}
				// can safely assume the remove request will go through so we do not want to make users wait for it to
				// complete; optimisticResponse used to return a "mock" response from the back-end - in this case, the
				// id of the item to be deleted (used to delete from cache in update upon a successful response)
				optimisticResponse={{
					__typename: 'Mutation', // return type
					removeFromCart: {
						__typename: 'CartItem',
						id: this.props.id,
					}
				}}>
				{(removeFromCart, { loading }) => {
					return (
						<RemoveButton title="Remove Item" disabled={loading}
									  onClick={() => {
										  removeFromCart({}).catch(err => alert(err.message));
									  }}>
							&times;
						</RemoveButton>
					);
				}}
			</Mutation>
		);
	}
}

export default RemoveFromCart;