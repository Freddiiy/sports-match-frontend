import jwt from 'jwt-decode'

export const URL = "http://localhost:8080";

interface IJtwToken {
	roles?: string[];
	username: string;
	password?: string
}

function handleHttpErrors(res: Response) {
	if (!res.ok) {
		return Promise.reject({ status: res.status, fullError: res.json() });
	}
	return res.json();
}

function apiFacade() {
	const setToken = (token: string) => {
		localStorage.setItem("jwtToken", token);
	};

	const getToken = ():any => {
		if (typeof window !== 'undefined') {
			return localStorage.getItem("jwtToken") || null;
		} else {
			console.log("On the server");
		}
	};

	const getRoles = () => {
		return jwt<IJtwToken>(getToken()).roles;
	}

	const getName = () => {
		return jwt<IJtwToken>(getToken()).username;
	}

	const loggedIn = () => {
		return getToken() != null;
	};

	const logout = () => {
		localStorage.removeItem("jwtToken");
	};

	const login = (user: string, password: string) => {
		const options = makeOptions("POST", true, {
			username: user,
			password: password,
		});
		return fetch(URL + "/api/auth/login", options)
			.then(handleHttpErrors)
			.then((res) => {
				setToken(res.token);
			});
	};

	const createUser = (user: string, password: string) => {
		const options = makeOptions("POST", true, {
			username: user,
			password: password,
		});
		return fetch(URL + "/api/auth/register", options)
			.then(handleHttpErrors);
	}

	const fetchData = () => {
		const options = makeOptions("GET", true); //True add's the token

		if (getRoles()?.includes("user")) {
			return fetch(URL + "/api/info/user", options).then(handleHttpErrors);
		} else if (getRoles()?.includes("admin")) {
			return fetch(URL + "/api/info/admin", options).then(handleHttpErrors);
		}
	};

	const makeOptions = (method: string, addToken: boolean, body?: IJtwToken) => {
		let opts: any = {
			method: method,
			headers: {
				"Content-type": "application/json",
				Accept: "application/json",
			}, body: undefined


		};
		if (addToken && loggedIn()) {
			opts.headers["x-access-token"] = getToken();
		}
		if (body) {
			opts.body = JSON.stringify(body);
		}
		return opts;
	};
	return {
		makeOptions,
		setToken,
		getToken,
		getRoles,
		getName,
		loggedIn,
		login,
		logout,
		createUser,
		fetchData
	};
}

const auth = apiFacade();
export default auth;