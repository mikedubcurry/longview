import { useState } from 'react';
import { AuthSection } from './AuthSection';
import { Logo } from './Logo';
import { MenuBtn } from './MenuBtn';
import { Nav } from './Nav';

export function Header({ auth, openState }) {
	const [isOpen, setIsOpen] = openState;

	return (
		<>
			<header
				css={css`
					position: sticky;
					background-color: #555;

					top: 0;
					z-index: 99;
					height: 9vh;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding-right: 16px;
				`}
			>
				<Logo />
				<MenuBtn openState={[isOpen, setIsOpen]} />
			</header>
			<Nav loggedIn={auth} openState={[isOpen, setIsOpen]}>
				<AuthSection loggedIn={auth} />
			</Nav>
		</>
	);
}
