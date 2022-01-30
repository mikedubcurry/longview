import type { NextPage } from 'next';

function About() {
	return (
		<>
			<header className=" container px-2 py-8 tracking-wider leading-relaxed">
				<h2 className="font-bold text-xl">About</h2>
				<p className='py-4'>
					If you're like me, you have a handful of long-running projects in your backlog and trying to manage all of
					them can be overwhelming. Longview aims to break your workload into a group of projects, and a separate group
					of goals. This way you can prioritize certain projects over another if you have a specific goal in mind.
				</p>
			</header>
			<section className="container px-2 py-8 tracking-wider leading-relaxed">
				<h2 className="font-bold text-xl">Goals and Projects</h2>
				<p className='py-4'>
					Imagine you run a blog, and you make money from showing ads and having affiliate links. You might have one
					goal as "Write four product review articles". You could have another as "Increase ad revenue for Q2". Each of
					these goals may have different measurements for success, so you can add your own milestones to track your
					progress.
				</p>
				<p className='py-4'>
					On a project basis, you want them to be on the smaller side. "Write Gadgets Blog Post", "Email New Ad Agency".
					Each of these can be associated with a parent Goal. You can also write notes to keep track of anything related
					to the project.
				</p>
			</section>
		</>
	);
}

export default About;
