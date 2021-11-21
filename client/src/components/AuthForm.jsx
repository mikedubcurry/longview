import { useEffect, useRef, useState } from 'react';
import { useDispatch, useStore } from 'react-redux';

import { signIn, signup } from '../actions/auth';
import { BaseButton } from './elements/BaseButton';

export function AuthForm({ intention, onClick }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [serverMessage, setServerMessage] = useState('');

	const usernameRef = useRef();
	const passwordRef = useRef();

	const dispatch = useDispatch();
	const authStore = useStore();

	useEffect(() => {
		const unsubscribe = authStore.subscribe(() => {
			const currentState = authStore.getState();
			if (currentState.error) {
				setServerMessage(currentState.error);
				usernameRef.current.classList.add('invalid');
				passwordRef.current.classList.add('invalid');
			}
			// listen for state changes, if login/signup is successful, close AuthForm
			const { loggedIn } = currentState;
			if (loggedIn) {
				onClick();
				setUsername('');
				setPassword('');
			}
		});

		return () => {
			unsubscribe();
		};
	});

	function passwordIsValid(pw) {
		if (!pw || pw.trim().length < 8) {
			return false;
		}
		return true;
	}

	function handleFormSubmit(e) {
		e.preventDefault();
		// reset input validation styles
		passwordRef.current.classList.remove('invalid');
		usernameRef.current.classList.remove('invalid');

		let valid = true;
		if (!username || !username.trim()) {
			usernameRef.current.classList.add('invalid');
			valid = false;
		}
		if (!passwordIsValid(password)) {
			passwordRef.current.classList.add('invalid');
			valid = false;
		}
		if (!valid) {
			return;
		}

		if (intention === 'LOGIN') {
			dispatch(signIn(username.trim(), password.trim()));
		} else if (intention === 'SIGNUP') {
			dispatch(signup(username.trim(), password.trim()));
		} else {
			alert('Login/Signup form seems to be broken...');
		}
	}

	return (
		<form
			css={css`
				input.invalid {
					background-color: var(--warning-color);
				}
			`}
		>
			<label htmlFor="username">Username:</label>
			<input
				ref={usernameRef}
				id="username"
				name="username"
				type="text"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<label htmlFor="password">Password:</label>
			<input
				ref={passwordRef}
				type="password"
				name="password"
				id="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			{serverMessage && <p>{serverMessage}</p>}
			{intention === 'LOGIN' ? (
				<BaseButton text="Log in" clickHandler={handleFormSubmit} />
			) : (
				<BaseButton text="Sign up" clickHandler={handleFormSubmit} />
			)}
		</form>
	);
}
