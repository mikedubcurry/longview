import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authConstants } from '../actions/constants';
import { AuthForm } from './AuthForm';
import { AuthButton } from './elements/AuthButton';

export function AuthSection({ loggedIn }) {
	const dispatch = useDispatch();
	const [loginFormOpen, setLoginFormOpen] = useState(false);
	const [signupFormOpen, setSignupFormOpen] = useState(false);
	const logout = () => {
		dispatch({ type: authConstants.LOGOUT });
	};

	const openLoginForm = () => {
		setSignupFormOpen(false);
		setLoginFormOpen(true);
	};

	const openSignupForm = () => {
		setLoginFormOpen(false);
		setSignupFormOpen(true);
	};

	if (loginFormOpen || signupFormOpen) {
		return (
			<>
				{loginFormOpen ? (
					<AuthForm intention="LOGIN" onClick={() => setLoginFormOpen(false)} />
				) : (
					<AuthForm intention="SIGNUP" onClick={() => setSignupFormOpen(false)} />
				)}
			</>
		);
	} else {
		return (
			<>
				{loggedIn ? (
					<AuthButton text="Log out" clickHandler={logout} />
				) : (
					<>
						<AuthButton text="Log in" clickHandler={openLoginForm} />
						<AuthButton text="Sign up" clickHandler={openSignupForm} />
					</>
				)}
			</>
		);
	}
}
