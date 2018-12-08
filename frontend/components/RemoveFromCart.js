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

	render() {
		return (
			<Mutation mutation={REMOVE_FROM_CART_MUTATION} variables={{ id: this.props.id }}
					  refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
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