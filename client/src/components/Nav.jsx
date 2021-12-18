import { Link, useLocation } from 'react-router-dom';

export function Nav({ openState, loggedIn, children }) {
	const { pathname } = useLocation();
	const [isOpen, setIsOpen] = openState;

	return (
		<div
			css={css`
				position: fixed;
				transition: top 0.3s ease;
				top: ${isOpen ? '8vh' : '-10vh'};
				z-index: 25;
				padding: 1rem;
				width: 100%;
				border-radius: 0 0 8px 8px;

				// background-color: #555;
				background-color: red;

				display: flex;
				justify-content: space-between;
				align-items: center;
				flex-direction: ${loggedIn ? 'column' : 'row'};

				& > nav,
				& > .auth {
					// height: 100%;
					display: grid;
					grid-template-rows: repeat(2, 1fr);
					justify-items: center;
					gap: 1rem;
				}
				& > nav {
					${loggedIn ? 'grid-template-columns: repeat(2, 1fr);' : ''}
					${loggedIn ? 'width: 100%;' : ''}
				}
				& > .auth {
					${loggedIn ? 'grid-template-rows: 1fr; grid-template-columns: 1fr 1fr; width: 100%;' : ''}
					align-self: end;
				}

				& > .auth button {
					${loggedIn ? 'grid-column: 2;' : ''}
				}

				& nav > a {
					position: relative;
					font-size: 24px;
					text-decoration-color: transparent;
					color: var(--primary-color);
					transition: text-decoration-color 0.3s ease;
				}

				& nav a::selection {
					color: unset;
					background-color: unset;
					text-decoration-color: transparent;
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
			<nav className={loggedIn ? 'loggedIn' : ''}>
				<Link onClick={() => setIsOpen(false)} className={pathname === '/' ? 'active' : ''} to="/">
					Home
				</Link>
				<Link onClick={() => setIsOpen(false)} className={pathname === '/about' ? 'active' : ''} to="/about">
					About
				</Link>
				{loggedIn && (
					<>
						<Link onClick={() => setIsOpen(false)} className={pathname.includes('/goals') ? 'active' : ''} to="/goals">
							Goals
						</Link>
						<Link
							onClick={() => setIsOpen(false)}
							className={pathname.includes('/projects') ? 'active' : ''}
							to="/projects"
						>
							Projects
						</Link>
					</>
				)}
			</nav>
			<div className="auth">{children}</div>
		</div>
	);
}
