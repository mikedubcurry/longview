import { Switch, Route, Redirect, useHistory } from 'react-router-dom';

import './App.css';
import Nav from './components/Nav';
import { useAuth } from './hooks';
import { About } from './pages/About';
import { Home } from './pages/Home';

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
				<Route path="/about">
					<About />
				</Route>
				<PrivateRoute path="/goals">Goals</PrivateRoute>
				<PrivateRoute path="/projects">Projects</PrivateRoute>
				<Route path="/">
					<Home />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
