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

function App() {
	const dispatch = useDispatch();
	let history = useHistory();
	let auth = useAuth();
	let { from } = location.state || { from: { pathname: '/' } };
	let login = () => {
		// use test creds until auth form is set up...
		dispatch(signIn('authtest', 'password'));
		auth.login(() => {
			history.replace(from);
		});
	};

	return (
		<div className="App">
			<Nav loggedIn={auth && auth.user}>
				{/* move login/logout buttons to Login.jsx/Logout.jsx made from ActionButton.jsx */}
				<AuthSection loggedIn={auth.user}/>
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
				<PrivateRoute path="/goals/:goalId">
					<GoalById />
				</PrivateRoute>
				<PrivateRoute path="/goals">
					<Goals />
				</PrivateRoute>
				<PrivateRoute path="/projects/:projectId">
					<ProjectById />
				</PrivateRoute>
				<PrivateRoute path="/projects">
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
