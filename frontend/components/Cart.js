import React from 'react';
import { Query, Mutation } from 'react-apollo'
import { adopt } from 'react-adopt';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CloseButton';
import SickButton from './styles/SickButton';
import User from '../components/User';
import CartItem from '../components/CartItem';
import calcTotalPrice from '../lib/calcTotalPrice';
import formatMoney from '../lib/formatMoney';
import { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION } from "../queries/queries";


const Composed = adopt({
	user: ({ render }) => <User>{render}</User>,
	toggleCart: ({ render }) => <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>,
	localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>,
});

const Cart = () => (
	<Composed>
		{({ user, toggleCart, localState }) => {
			const currentUser = user.data.currentUser;
			if (!currentUser) return null;

			return (
				<CartStyles open={localState.data.cartOpen}>
					<header>
						<CloseButton title="close" onClick={toggleCart}>&times;</CloseButton>
						<Supreme>Cart</Supreme>
						<p>
							You have {currentUser.cart.length} item{currentUser.cart.length === 1 ? '' :
							's'} in your cart
						</p>
					</header>
					<ul>
						{currentUser.cart.map(cartItem => {
							return <CartItem key={cartItem.id} cartItem={cartItem}/>
						})}
					</ul>
					<footer>
						<p>{formatMoney(calcTotalPrice(currentUser.cart))}</p>
						<SickButton>Checkout</SickButton>
					</footer>
				</CartStyles>
			);
		}}
	</Composed>
);

export default Cart;