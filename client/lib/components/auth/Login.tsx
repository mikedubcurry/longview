import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';

function Login({}) {
	const router = useRouter();
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();

	const onSubmit = handleSubmit(async (data) => {
		const res = await fetch('/api/user/login', { method: 'post', body: JSON.stringify(data) });
		if (res.ok) {
			const { token } = await res.json();
			if (token) {
				router.reload()
			}
		}
	});

	return (
		<form onSubmit={onSubmit}>
			<label htmlFor="username">
				<span>Email</span>
			</label>
			<input type="username" id="username" {...register('username', { required: true })} />
			<label htmlFor="password">
				<span>Password</span>
			</label>
			<input type="password" id="password" {...register('password', { required: true })} />
			<input type="submit" value="Log In" />
		</form>
	);
}

export default Login;

export async function getServerSideProps(context: GetServerSidePropsContext) {
	// const user = await userFromRequest(context.req);
	let user = {};
	if (user) {
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
