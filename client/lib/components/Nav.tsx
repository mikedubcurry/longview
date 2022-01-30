import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

function Nav() {
	const [loggedIn, setLoggedIn] = useState(null);
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		if (!loggedIn) {
			setLoading(true);
			fetch('api/user')
				.then((res) => res.json())
				.then((data) => {
					setLoggedIn(data);
					setLoading(false);
				});
		}
	}, [loggedIn]);

	const logOut = async () => {
		const res = await fetch('/api/user/logout');
		if (res.redirected) {
			window.location.href = res.url;
		}
	};

	return (
		<nav className="flex justify-between  bg-violet-400">
			<span className="p-4">
				<h1 className="inline">Longview</h1>
			</span>
			<span className="w-2/3 grid grid-cols-2 gap-4 sm:flex sm:justify-between p-4 px-8 bg-gradient-to-r from-violet-400 to-purple-600">
				<span className="justify-self-end col-start-1 row-start-1">
					<Link href="/">Home</Link>
				</span>
				<span className="justify-self-end col-start-1 row-start-2">
					<Link href="/about">About</Link>
				</span>
				{loggedIn && (
					<>
						<span className="justify-self-end col-start-2 row-start-1">
							<Link href="/goals">Goals</Link>
						</span>
						<span className="justify-self-end col-start-2 row-start-2">
							<Link href="/projects">Projects</Link>
						</span>
					</>
				)}
				{!isLoading && loggedIn ? (
					<span className="justify-self-end col-start-2" onClick={logOut}>
						Log Out
					</span>
				) : (
					<span className="justify-self-end col-start-2">
						<Link href="/account">Log In</Link>
					</span>
				)}
			</span>
		</nav>
	);
}

export default Nav;
