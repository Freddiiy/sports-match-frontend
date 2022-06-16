import {useEffect, useState} from "react";
import auth from "../auth/jwt";

export default function Admin() {
	const [loggedIn, setLoggedIn] = useState(auth.loggedIn);

	return (
		<>
			{auth?.getRoles()?.includes("admin") ? <h1>Du er admin :)</h1> : <h1>Ingen adgang.</h1>}
		</>
	)
}