import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import calcTotalPrice from '../lib/calcTotalPrice';
import Error from './ErrorMessage';
import User from './User';
import { CURRENT_USER_QUERY, CREATE_ORDER_MUTATION } from "../queries/queries";


/**
 * Get total number of items from users' cart
 * @param cart - currentUser.cart
 * @returns number of items
 */
function totalItems(cart) {
	return cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
}

class Charge extends React.Component {
	/**
	 * Respond to token returns from Stripe
	 * @param response - Stripe response
	 * @param createOrder - createOrder mutation
	 */
	onToken = async (response, createOrder) => {
		NProgress.start();
		const order = await createOrder({
			variables: {
				token: response.id
			},
		}).catch(err => {
			alert(err.message);
		});

		// transfer to order page
		Router.push({
			pathname: '/order',
			query: {
				id: order.data.createOrder.id,
			}
		})
	};

	render() {
		return (
			<User>
				{({ data: { currentUser } }) => (
					<Mutation mutation={CREATE_ORDER_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
						{(createOrder) => (
							<StripeCheckout
								amount={calcTotalPrice(currentUser.cart)}
								name="Sick Fits"
								description={`Order of ${totalItems(currentUser.cart)} items`}
								image={currentUser.cart.length && currentUser.cart[0].item && currentUser.cart[0].item.image}
								stripeKey="pk_test_kMeWdXYUASgLL9oF8dI502Pu"
								currency="USD"
								email={currentUser.email}
								token={response => this.onToken(response, createOrder)}
							>
								{this.props.children}
							</StripeCheckout>
						)}
					</Mutation>
				)}
			</User>
		)
	}
}

export default Charge;