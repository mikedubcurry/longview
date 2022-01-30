import type { GetServerSidePropsContext, NextPage } from 'next';

type ProjectProps = {
	projects: {
		idea: string;
		description: string;
		id: string;
	}[];
};

function Projects({ projects }: ProjectProps) {
	console.log(projects);

	return <h1>Projects</h1>;
}

export default Projects;

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { auth } = context.req.cookies;
	if (!auth) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	const response = await fetch(`${process.env.SERVER_URL || ''}/projects`, {
		headers: {
			authorization: `Bearer ${auth}`,
		},
	});
	const projects = await response.json();
	// console.log(projects);

	return {
		props: { projects },
	};
}
