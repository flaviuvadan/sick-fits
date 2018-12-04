import React from 'react';
import { Query, Mutation } from 'react-apollo'
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CloseButton';
import SickButton from './styles/SickButton';
import { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION } from "../queries/queries";

const Cart = () => (
	<Query query={LOCAL_STATE_QUERY}>
		{({ data }) => {

			<CartStyles open={data.cartOpen}>
				<header>
					<CloseButton title="close">&times;</CloseButton>
					<Supreme>Your Cart</Supreme>
					<p>You have ... items in your cart</p>
				</header>

				<footer>
					<p>$10.00</p>
					<SickButton>Checkout</SickButton>
				</footer>
			</CartStyles>
		}}
	</Query>
);

export default Cart;