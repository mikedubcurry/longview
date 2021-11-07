import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App, { ProvideAuth } from './App';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
	<React.StrictMode>
		<ProvideAuth>
			<Router>
				<App />
			</Router>
		</ProvideAuth>
	</React.StrictMode>,
	document.getElementById('root')
);
