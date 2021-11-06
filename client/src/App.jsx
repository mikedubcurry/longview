import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';

import './App.css';
import Nav from './components/Nav';

function App() {
	const [loggedIn, setLoggedIn] = useState(false);

	// useEffect(() => {
	// 	if (!loggedIn) {
  //     window.location = '/'
	// 	}
	// }, [loggedIn]);

	return (
		<div className="App">
			<Router>
				<Nav loggedIn={loggedIn} />
				<button onClick={() => setLoggedIn(!loggedIn)}>{loggedIn ? 'Log out' : 'Log in'}</button>
				<Switch>
					<Route path="/about">About</Route>
					<Route path="/goals">Goals</Route>
					<Route path="/projects">Projects</Route>
					<Route path="/">Home</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
