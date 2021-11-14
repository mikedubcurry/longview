import { Switch, Route, Redirect, useHistory } from 'react-router-dom';

import './App.css';
import { AuthButton } from './components/AuthButton';
import Nav from './components/Nav';
import { useAuth } from './hooks';
import { About } from './pages/About';
import { Home } from './pages/Home';
import { Goals } from './pages/Goals';
import { GoalById } from './pages/GoalById';
import { Projects } from './pages/Projects';
import { ProjectById } from './pages/ProjectById';

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
			<Nav loggedIn={auth && auth.user}>
				{/* move login/logout buttons to Login.jsx/Logout.jsx made from ActionButton.jsx */}
				{auth && auth.user ? (
					<AuthButton text="Log out" clickHandler={() => auth.signout(() => history.push('/'))} />
				) : (
					<AuthButton clickHandler={login} text="Log in" />
				)}
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
