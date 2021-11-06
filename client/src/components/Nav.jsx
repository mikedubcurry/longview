import {Link} from 'react-router-dom'

function Nav({ loggedIn }) {
	return (
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
	);
}

export default Nav;
