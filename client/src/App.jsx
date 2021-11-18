import { Switch, Route, Redirect, useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import './App.css';
import { AuthButton } from './components/elements/AuthButton';
import { Nav } from './components/Nav';
import { useAuth } from './hooks';
import { About } from './pages/About';
import { Home } from './pages/Home';
import { Goals } from './pages/Goals';
import { GoalById } from './pages/GoalById';
import { Projects } from './pages/Projects';
import { ProjectById } from './pages/ProjectById';

import { signIn } from './actions/auth';
import { AuthSection } from './components/AuthSection';
import { useStore } from 'react-redux';
import { useEffect, useState } from 'react';

function PrivateRoute({ children, user, ...rest }) {
	// let auth = useAuth();
	return (
		<Route
			{...rest}
			render={({ location }) =>
				user ? (
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

function App() {
	const store = useStore();
	const [auth, setAuth] = useState(null);

	useEffect(() => {
		const currentState = store.getState();
		if (currentState.token) {
			setAuth(currentState.token);
		}
		const unsubscribe = store.subscribe(() => {
			setAuth(store.getState().token);
		});

		return () => {
			unsubscribe();
		};
	}, [auth]);
	// const dispatch = useDispatch();
	// let history = useHistory();
	// let auth = useAuth();
	// let { from } = location.state || { from: { pathname: '/' } };
	// let login = () => {
	// 	// use test creds until auth form is set up...
	// 	dispatch(signIn('authtest', 'password'));
	// 	auth.login(() => {
	// 		history.replace(from);
	// 	});
	// };

	return (
		<div className="App">
			<Nav loggedIn={auth}>
				{/* move login/logout buttons to Login.jsx/Logout.jsx made from ActionButton.jsx */}
				<AuthSection loggedIn={auth} />
				{/* {auth && auth.user ? (
					<AuthButton text="Log out" clickHandler={() => auth.logout(() => history.push('/'))} />
				) : (
					<AuthButton clickHandler={login} text="Log in" />
				)} */}
			</Nav>
			<Switch>
				<Route path="/about">
					<About />
				</Route>
				<PrivateRoute user={auth} path="/goals/:goalId">
					<GoalById />
				</PrivateRoute>
				<PrivateRoute user={auth} path="/goals">
					<Goals />
				</PrivateRoute>
				<PrivateRoute user={auth} path="/projects/:projectId">
					<ProjectById />
				</PrivateRoute>
				<PrivateRoute user={auth} path="/projects">
					<Projects />
				</PrivateRoute>
				<Route path="/">
					<Home />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
