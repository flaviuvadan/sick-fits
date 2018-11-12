import gql from 'graphql-tag';

// could have queries in separate file but not yet
export const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY {
		items {
			id
			title
			price
			description
			image
			largeImage
		}
    }
`;
