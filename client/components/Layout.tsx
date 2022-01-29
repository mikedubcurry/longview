import { ReactElement } from 'react';

import Nav from './Nav';

function Layout({ children }: { children: ReactElement }) {
	return (
		<>
			<Nav />
			<main>{children}</main>
		</>
	);
}

export default Layout;
