import gql from 'graphql-tag';

import { perPage } from '../config';

export const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY(
		$skip: Int = 0
		$first: Int = ${ perPage }
	) {
        items(
			orderBy: createdAt_DESC
			skip: $skip
			first: $first 
		) {
            id
            title
            price
            description
            image
            largeImage
        }
    }
`;

export const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $title: String!
        $description: String!
        $price: Int!
        $image: String
        $largeImage: String
    ) {
        createItem(
            title: $title
            description: $description
            price: $price
            image: $image
            largeImage: $largeImage
        ) {
            id
        }
    }
`;

export const UPDATE_ITEM_MUTATION = gql`
    mutation UPDATE_ITEM_MUTATION(
        $id: ID!
        $title: String
        $description: String
        $price: Int
    ) {
        updateItem(
            id: $id
            title: $title
            description: $description
            price: $price
        ) {
            id
            title
            description
            price
        }
    }
`;

export const ITEM_QUERY = gql`
    query ITEM_QUERY(
        $id: ID!
    ) {
        item(where: {
            id: $id
        }) {
            id
            title
            description
            price
            largeImage
        }
    }
`;

export const DELETE_ITEM_MUTATION = gql`
    mutation DELETE_ITEM_MUTATION(
        $id: ID!
    ) {
        deleteItem(
            id: $id
        ) {
            id
        }
    }
`;

export const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY {
    	itemsConnection {
    		aggregate {
    			count
    		}
    	}
    }
`;