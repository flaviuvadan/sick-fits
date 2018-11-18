import Items from '../components/Items';
import React from "react";


const Home = props => (
	<div>
		<Items page={parseFloat(props.query.page) || 1}/>
	</div>
);

export default Home;