import { ReactElement } from 'react';

import Nav from './Nav';

function Layout({ children }: { children: ReactElement }) {
	return (
		<>
			<Nav />
			<main className='container mx-auto  h-full bg-zinc-300'>{children}</main>
		</>
	);
}

export default Layout;
