import { GetServerSidePropsContext } from 'next';
import Login from '../../lib/components/auth/Login';

function AccountPage({}) {
	return (
		<>
			<h1>Account Page</h1>
			<Login />
		</>
	);
}

export default AccountPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { auth } = context.req.cookies;
	if (auth) {
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
