import { useEffect, useState, useContext, createContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom';

import './App.css';
import Nav from './components/Nav';

const fakeAuth = {
	isAuthenticated: false,
	signin(cb) {
		fakeAuth.isAuthenticated = true;
		setTimeout(cb, 100); // fake async
	},
	signout(cb) {
		fakeAuth.isAuthenticated = false;
		setTimeout(cb, 100);
	},
};

const authContext = createContext();

function useAuth() {
	return useContext(authContext);
}

function PrivateRoute({ children, ...rest }) {
	let auth = useAuth();
	return (
		<Route
			{...rest}
			render={({ location }) =>
				auth.user ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/',
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
}

export function ProvideAuth({ children }) {
	const auth = useProvideAuth();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function useProvideAuth() {
	const [user, setUser] = useState(null);

	const signin = (cb) => {
		return fakeAuth.signin(() => {
			setUser('user');
			cb();
		});
	};

	const signout = (cb) => {
		return fakeAuth.signout(() => {
			setUser(null);
			cb();
		});
	};

	return {
		user,
		signin,
		signout,
	};
}

function App() {
	let history = useHistory();
	let auth = useAuth();
	let { from } = location.state || { from: { pathname: '/' } };
	let login = () => {
		auth.signin(() => {
			history.replace(from);
		});
	};

	return (
		<div className="App">
			<Nav loggedIn={auth && auth.user} />
			{auth && auth.user ? (
				<button
					onClick={() => {
						auth.signout(() => history.push('/'));
					}}
				>
					Log out
				</button>
			) : (
				<button onClick={login}>Log in</button>
			)}
			<Switch>
				<Route path="/about">About</Route>
				<PrivateRoute path="/goals">Goals</PrivateRoute>
				<PrivateRoute path="/projects">Projects</PrivateRoute>
				<Route path="/">Home</Route>
			</Switch>
		</div>
	);
}

export default App;
