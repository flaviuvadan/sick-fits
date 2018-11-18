import React, { Component } from 'react';
import PaginationStyles from './styles/PaginationStyles';

import { Query } from 'react-apollo';
import { PAGINATION_QUERY } from '../queries/queries';
import { perPage } from '../config';

export default class Pagination extends Component {
	render() {
		return (
			<PaginationStyles>
				<Query query={PAGINATION_QUERY}>
					{({ data, loading, error }) => {
						if (loading) return <p>Loading...</p>;
						const count = data.itemsConnection.aggregate.count;
						const pages = Math.ceil(count / perPage);
						return <p>Page 1 of {pages}</p>
					}}
				</Query>
			</PaginationStyles>
		)
	}
}
