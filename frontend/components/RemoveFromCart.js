import React from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY } from "../queries/queries";


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
			<RemoveButton title="Remove Item">&times;</RemoveButton>
		);
	}
}

export default RemoveFromCart;