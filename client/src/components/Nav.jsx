import { Link } from 'react-router-dom';

import './css/Nav.css';

function Nav({ loggedIn, children }) {
	return (
		<div className="nav-bar">
			<nav>
				<Link to="/">Home</Link>
				<Link to="/about">About</Link>
				{loggedIn && (
					<>
						<Link to="/goals">Goals</Link>
						<Link to="/projects">Projects</Link>
					</>
				)}
			</nav>
			<div className="auth">{children}</div>
		</div>
	);
}

export default Nav;
