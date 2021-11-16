const apiServerHost = import.meta.env.api_server_host;

async function login(username, password) {
	if (!username || !password) {
		throw Error('username and password must be included to log in');
	}
	try {
		const response = await fetch(`${apiServerHost}/user/login`, {
			method: 'POST',
			body: JSON.stringify({ username, password }),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (response.ok) {
			const token = await response.json();
			// user logged in
			return token;
		} else {
			throw Error('login failed');
		}
	} catch (e) {
		throw Error(e);
	}
}

async function signup(username, password) {
	if (!username || !password) {
		throw Error('username and password must be included to sign up');
	}
	try {
		const response = await fetch('http://localhost:3000/user/signup', {
			method: 'POST',
			body: JSON.stringify({
				username,
				password,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (response.ok) {
			// user signed up!
			const token = await response.json();

			return token;
		}
	} catch (e) {
		throw Error(e);
	}
}

const userTokenKey = import.meta.env.userTokenKey;

function logout() {
	localStorage.removeItem(userTokenKey);

	return true;
}

export default { login, logout, signup };
