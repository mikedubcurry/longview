import type { GetServerSidePropsContext, NextPage } from 'next';

function Projects() {
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

	return {
		props: {},
	};
}