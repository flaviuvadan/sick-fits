import styled from 'styled-components';
import React, { Component } from 'react';
import { Query } from 'react-apollo';

import Item from './Item';
import Pagination from './Pagination';
import { ALL_ITEMS_QUERY } from '../queries/queries';

// this would be much nicer with css/scss
// could package Center into its own component, similar to how Angular does it
const Center = styled.div`
	text-align: center;
`;

const ItemsList = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 60px;
	max-width: ${props => props.theme.maxWidth};
	margin: 0 auto;
`;

export default class Items extends Component {
	render() {
		return (
			<Center>
				<Pagination/>
				<Query query={ALL_ITEMS_QUERY}>
					{({ data, error, loading }) => {
						if (loading) return (<p>Loading...</p>);
						if (error) return (<p>Error: {error.message}</p>);
						return (
							<ItemsList>
								{data.items.map(item => <Item key={item.id} item={item}/>)}
							</ItemsList>
						)
					}}
				</Query>
				<Pagination/>
			</Center>
		)
	}
}