import { Link, useLocation } from 'react-router-dom';

import './css/Nav.css';

export function Nav({ loggedIn, children }) {
	const { pathname } = useLocation();
	console.log(pathname);
	return (
		<div className="nav-bar">
			<nav>
				<Link className={pathname === '/' ? 'active' : ''} to="/">
					Home
				</Link>
				<Link className={pathname === '/about' ? 'active' : ''} to="/about">
					About
				</Link>
				{loggedIn && (
					<>
						<Link className={pathname.includes('/goals') ? 'active' : ''} to="/goals">
							Goals
						</Link>
						<Link className={pathname.includes('/projects') ? 'active' : ''} to="/projects">
							Projects
						</Link>
					</>
				)}
			</nav>
			<div className="auth">{children}</div>
		</div>
	);
}
