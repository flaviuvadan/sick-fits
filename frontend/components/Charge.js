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


class Charge extends React.Component {
	render() {
		return (
			<User>
				{({ data: { currentUser } }) => <p>{this.props.children}</p>}
			</User>
		)
	}
}

export default Charge;