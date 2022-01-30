import type { GetServerSidePropsContext, NextPage } from 'next';

function Goals() {
	return <h1>Goals</h1>;
}

export default Goals;

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
