// import Svg from '../assets/logo.svg';
import './css/Logo.css';

export function Logo() {
	return (
		<svg width="256px" height="128px" viewBox="0 0 128 256" id="logo" xmlns="http://www.w3.org/2000/svg">
			<path
				fill="none"
				strokeLinecap="round"
				strokeWidth="5"
				stroke="#000"
				id="logo-l"
				d="M 6, 250 L 106, 250 L 106, 6"
			/>
			<path
				fill="none"
				strokeLinecap="round"
				strokeWidth="5"
				stroke="#000"
				id="logo-o"
				d="M 12,5 C 2,2 8,2 8,5 M2,5 C2,8 8,8 8,5"
			/>
		</svg>
	);
}
