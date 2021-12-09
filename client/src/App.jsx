import { useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';

// import './App.css';
import { Nav } from './components/Nav';
import { About } from './pages/About';
import { Home } from './pages/Home';
import { Goals } from './pages/Goals';
import { GoalById } from './pages/GoalById';
import { Projects } from './pages/Projects';
import { ProjectById } from './pages/ProjectById';
import { AuthSection } from './components/AuthSection';
import { Header } from './components/Header';

function PrivateRoute({ children, auth, ...rest }) {
	return (
		<Route
			{...rest}
			render={({ location }) =>
				auth ? (
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
	const [navOpen, setNavOpen] = useState(false);

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
	return (
		<>
			<Header auth={auth} openState={[navOpen, setNavOpen]} />
			{/* <Nav loggedIn={auth}>
				<AuthSection loggedIn={auth} />
			</Nav> */}
			<div onClick={() => setNavOpen(false)}>
				<Switch>
					<Route path="/about">
						<About />
					</Route>
					<PrivateRoute auth={auth} path="/goals/:goalId">
						<GoalById />
					</PrivateRoute>
					<PrivateRoute auth={auth} path="/goals">
						<Goals />
					</PrivateRoute>
					<PrivateRoute auth={auth} path="/projects/:projectId">
						<ProjectById />
					</PrivateRoute>
					<PrivateRoute auth={auth} path="/projects">
						<Projects />
					</PrivateRoute>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
			</div>
		</>
	);
}

export default App;
