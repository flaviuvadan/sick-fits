// a high order component that exposes the Apollo client via a prop
// want server side rendering and next-with-apollo helps with that
import withApollo from 'next-with-apollo';

// package by Apollo containing all the std things one may use
// can extend what the Apollo client does and contains a lot of pre-configed things
import ApolloClient from 'apollo-boost';
import { endpoint } from '../config';

import { LOCAL_STATE_QUERY } from "../queries/queries";


// header important for authentication
function createClient({ headers }) {
	return new ApolloClient({
		uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
		// include credentials on every request, includes cookies
		request: operation => {
			operation.setContext({
				fetchOptions: {
					credentials: 'include',
				},
				headers,
			});
		},
		// local data
		clientState: {
			resolvers: {
				Mutation: {
					// toggleCart will have one variable garbage collected
					toggleCart(_, variables, { cache }) {
						// read cartOpen value from cache
						const { cartOpen } = cache.readQuery({
							query: LOCAL_STATE_QUERY,
						});
						// write cart state to opposite
						const data = {
							data: {
								cartOpen: !cartOpen,
							},
						};
						cache.writeData(data);
						return data;
					},
				},
			},
			defaults: {
				cartOpen: true
			}
		}
	});
}

export default withApollo(createClient);
