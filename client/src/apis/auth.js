const apiServerHost = import.meta.env.VITE_api_server_host;

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
			const errMessage = await response.json();
			console.log(errMessage);
			throw errMessage.message;
		}
	} catch (e) {
		console.log('error');
		throw e;
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
		}  else {
			const errMessage = await response.json();
			console.log(errMessage);
			throw errMessage.message;
		}
	} catch (e) {
		throw e;
	}
}

export default { login, signup };
