import React from 'react';
import Downshift from 'downshift';
import Router from 'next/router';
import debounce from 'lodash.debounce';
import { ApolloConsumer } from 'react-apollo';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';


class AutoComplete extends React.Component {
	render() {
		return (
			<SearchStyles>
				<div>
					<input type="search"/>
					<DropDown>
						<p>Items</p>
					</DropDown>
				</div>
			</SearchStyles>
		)
	}
}