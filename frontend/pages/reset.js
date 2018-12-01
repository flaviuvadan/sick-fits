import React from 'react';

const Reset = props => (
	<div>
		<p>Reset your password {props.query.resetToken}</p>
	</div>
);

export default Reset;