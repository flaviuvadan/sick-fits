// a high order component that exposes the Apollo client via a prop
// want server side rendering and next-with-apollo helps with that
import withApollo from 'next-with-apollo';

// package by Apollo containing all the std things one may use
// can extend what the Apollo client does and contains a lot of pre-configed things
import ApolloClient from 'apollo-boost';
import { endpoint } from '../config';

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
  });
}

export default withApollo(createClient);
