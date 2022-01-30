import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

const Home: NextPage = () => {
	return (
		<>
			<header className="h-1/2 container px-2 py-8 bg-gradient-to-r from-indigo-300  to-violet-300 tracking-wider leading-loose">
				<h2 className="font-bold text-xl">Organize and Track Progress</h2>
				<p>Keep track of different Goals and Projects</p>
			</header>
			<section className="h-1/4 container text-right px-2 py-8 tracking-wider leading-loose bg-gradient-to-r from-purple-200 to to-violet-200">
				<h2 className="font-bold text-xl">Take Notes</h2>
				<p>Taking notes while working on a project</p>
			</section>
			<section className="h-1/4 container px-2 py-8 tracking-wider leading-loose bg-gradient-to-r from-violet-200 to to-indigo-300">
				<h2 className="font-bold text-xl">Analysis</h2>
				<p>Keep track of progress with a detailed summary of all of your projects and goals</p>
			</section>
		</>
	);
};

export default Home;
