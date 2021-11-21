import { Link, useLocation } from 'react-router-dom';

export function Nav({ loggedIn, children }) {
	const { pathname } = useLocation();

	return (
		<div
			css={css`
				position: sticky;
				top: 0;

				padding: 0 1rem;
				height: 8vh;

				background-color: #555;

				display: flex;
				justify-content: space-between;
				align-items: center;

				& > nav {
					flex: 1;
					display: flex;
					justify-content: start;
					gap: 1rem;
				}

				& nav > a {
					position: relative;
					font-size: 18px;
					text-decoration-color: transparent;
					color: var(--primary-color);

					transition: text-decoration-color 0.3s ease;
				}

				nav > a::before {
					left: 0;
					top: 100%;
					content: '';
					position: absolute;
					width: 0;
					height: 3px;
					background: linear-gradient(to bottom right, #ffffff, 50%, var(--primary-color));
					transition: width 0.3s ease;
				}

				nav > a::after {
					right: 0;
					top: 100%;
					content: '';
					position: absolute;
					width: 0;
					height: 3px;
					background: linear-gradient(to bottom right, #ffffff, 50%, var(--secondary-color));
					transition: width 0.3s ease;
					/* text-decoration-color: #218077; */
				}

				nav > a.active::after {
					width: 100%;
				}

				nav > a:hover::before,
				nav > a:focus::before {
					width: 100%;
				}

				/* prevent both underlines from appearing when changing links */
				nav > a.active::before {
					width: 0;
				}
			`}
		>
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
