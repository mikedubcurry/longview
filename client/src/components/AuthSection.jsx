import { useState } from 'react';
import { AuthForm } from './AuthForm';
import { AuthButton } from './elements/AuthButton';

export function AuthSection({ loggedIn }) {
	const [loginFormOpen, setLoginFormOpen] = useState(false);
	const [signupFormOpen, setSignupFormOpen] = useState(false);
	const logout = () => {
		console.log('logging out');
	};

	const openLoginForm = () => {
		console.log('displaying login form');
		setSignupFormOpen(false);
		setLoginFormOpen(true);
	};

	const openSignupForm = () => {
		console.log('displaying signup form');
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
	// return (
	// 	<>
	// {loggedIn ? (
	// 	<AuthButton text="Log out" clickHandler={logout} />
	// ) : (
	// 	<>
	// 		<AuthButton text="Log in" clickHandler={openLoginForm} />
	// 		<AuthButton text="Sign up" clickHandler={openSignupForm} />
	// 	</>
	// )}

	//     {
	//       formOpen && (
	//         <AuthForm intention="LOGIN" />
	//       )
	//     }
	// 	</>
	// );
}
