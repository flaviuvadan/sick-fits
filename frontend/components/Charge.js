import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import calcTotalPrice from '../lib/calcTotalPrice';
import Error from './ErrorMessage';
import User from './User';
import { CURRENT_USER_QUERY } from "../queries/queries";


/**
 * Get total number of items from users' cart
 * @param cart - currentUser.cart
 * @returns number of items
 */
function totalItems(cart) {
	return cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
}

class Charge extends React.Component {
	render() {
		return (
			<User>
				{({ data: { currentUser } }) => (
					<StripeCheckout
						amount={calcTotalPrice(currentUser.cart)}
						name="Sick Fits"
						description={`Order of ${totalItems(currentUser.cart)} items`}
						image={currentUser.cart[0].item && currentUser.cart[0].item.image}
						stripeKey="pk_test_kMeWdXYUASgLL9oF8dI502Pu"
						currency="USD"
						email={currentUser.email}
					>
						{this.props.children}
					</StripeCheckout>
				)}
			</User>
		)
	}
}

export default Charge;