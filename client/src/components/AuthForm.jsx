import { useState } from 'react';

import { BaseButton } from './elements/BaseButton';

export function AuthForm({ intention, onClick }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	return (
		<form>
			<label htmlFor="username">Username:</label>
			<input id="username" name="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
			<label htmlFor="password">Password:</label>
			<input
				type="password"
				name="password"
				id="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>

			{intention === 'LOGIN' ? (
				<BaseButton
					text="Log in"
					clickHandler={(e) => {
						e.preventDefault();
						console.log('loggin in!');
            onClick()
					}}
				/>
			) : (
				<BaseButton
					text="Sign up"
					clickHandler={(e) => {
						e.preventDefault();
						console.log('signin up!');
            onClick()
					}}
				/>
			)}
		</form>
	);
}
