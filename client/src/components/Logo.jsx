// import Svg from '../assets/logo.svg';
import './css/Logo.css';

export function Logo() {
	const letters = ['o', 'n', 'g', 'v', 'i', 'e', 'w'];
	return (
		<svg width="500px" height="128px" viewBox="0 0 128 256" id="logo" xmlns="http://www.w3.org/2000/svg">
			<path
				fill="none"
				strokeLinecap="round"
				strokeWidth="5"
				stroke="#000"
				id="logo-l"
				d="M 66, 250 L 166, 250 L 166, 6"
			/>
			{letters.map((l, i) => (
				<text id={"logo"+i} key={i} x={((i / 300) * 10000 - 115).toString()} fontSize="32" y="200">
					{l}
				</text>
			))}
		</svg>
	);
}
