import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import { useProvideAuth } from './hooks';
import { authContext } from './context';
import { authStore } from './stores';

export function ProvideAuth({ children }) {
	const auth = useProvideAuth();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

ReactDOM.render(
	<React.StrictMode>
		<Provider store={authStore}>
			{/* <ProvideAuth> */}
				<Router>
					<App />
				</Router>
			{/* </ProvideAuth> */}
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
