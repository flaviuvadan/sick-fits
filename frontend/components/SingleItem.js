import React, { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';

import DisplayError from '../components/ErrorMessage';
import { ITEM_QUERY } from '../queries/queries';


const SingleItemStyle = styled.div`
	max-width: 1200px;
	margin: 2rem auto;
	box-shadow: ${props => props.theme.bs};
	display: grid;
	grid-auto-columns: 1fr;
	grid-auto-flow: column;
	min-height: 800px;
`;

class SingleItem extends Component {
	render() {
		return (
			<Query query={ITEM_QUERY} variables={{ id: this.props.id }}>
				{({ error, loading, data }) => {
					if (error) return <DisplayError error={error}/>;
					if (loading) return <p>Loading...</p>;
					if (!data.item) return <p>No item with ID: {this.props.id}</p>
					return <SingleItemStyle>
						<img src={data.item.largeImage} alt={data.item.title}/>
					</SingleItemStyle>
				}}
			</Query>
		);
	}
}

export default SingleItem;