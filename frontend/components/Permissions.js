import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Error from './ErrorMessage';
import { ALL_USERS_QUERY } from "../queries/queries";

const Permissions = props => (
	<Query query={ALL_USERS_QUERY}>
		{({ data, loading, error }) => {
				return <Error error={error}/>
				return <p>Hey</p>
		}}
	</Query>
);

export default Permissions;