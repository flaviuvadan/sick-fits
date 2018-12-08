import React from 'react';
import { Query, Mutation } from 'react-apollo'
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CloseButton';
import SickButton from './styles/SickButton';
import User from '../components/User';
import { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION } from "../queries/queries";

const Cart = () => (
	<User>{({ data: { currentUser } }) => {
		if (!currentUser) return null;
		return (
			<Mutation mutation={TOGGLE_CART_MUTATION}>{(toggleCart) => (
				<Query query={LOCAL_STATE_QUERY}>
					{({ data }) => {
						return (
							<CartStyles open={data.cartOpen}>
								<header>
									<CloseButton title="close" onClick={toggleCart}>&times;</CloseButton>
									<Supreme>Cart</Supreme>
									<p>You have ... items in your cart</p>
								</header>

								<footer>
									<p>$10.00</p>
									<SickButton>Checkout</SickButton>
								</footer>
							</CartStyles>
						);
					}}
				</Query>
			)}
			</Mutation>
		)
	}}</User>
);

export default Cart;