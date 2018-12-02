import React from "react";
import SigninWarning from '../components/SignInWarning';
import Permissions from '../components/Permissions';


const PermissionsPage = () => (
	<div>
		<SigninWarning>
			<Permissions/>
		</SigninWarning>
	</div>
);

export default PermissionsPage;