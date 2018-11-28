import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { CURRENT_USER_QUERY, SIGNOUT_MUTATION } from "../queries/queries";

const Signout = props => (
	<Mutation mutation={SIGNOUT_MUTATION} refetchQueries={[{
		query: CURRENT_USER_QUERY
	}]}>
		{(signout) => <button onClick={signout}>Sign Out</button>}
	</Mutation>
);

export default Signout;