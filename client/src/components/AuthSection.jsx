import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authConstants } from '../actions/constants';
import { AuthForm } from './AuthForm';
import { AuthButton } from './elements/AuthButton';
import { Modal } from './elements/Modal';

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

	return (
		<>
			{(loginFormOpen || signupFormOpen) && (
				<>
					{loginFormOpen ? (
						<Modal open={loginFormOpen} onClose={() => setLoginFormOpen(false)}>
							<h2
								css={css`
									font-size: 40px;
									margin-bottom: 12px;
								`}
							>
								Log In
							</h2>
							<AuthForm intention="LOGIN" onClick={() => setLoginFormOpen(false)} />
						</Modal>
					) : (
						<Modal open={signupFormOpen} onClose={() => setSignupFormOpen(false)}>
							<h2
								css={css`
									font-size: 40px;
									margin-bottom: 12px;
								`}
							>
								Sign Up
							</h2>
							<AuthForm intention="SIGNUP" onClick={() => setSignupFormOpen(false)} />
						</Modal>
					)}
				</>
			)}
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
