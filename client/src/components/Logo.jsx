const styles = css`
	#logo-l {
		transform-origin: 150% 100%;
		animation: fallover 1s ease forwards;
	}

	#logo0 {
		transform: translateY(100%);
		transition: transform;
		animation: popup 0.5s cubic-bezier(0.3, 0.7, 0.4, 1.5) 1s forwards;
	}
	#logo1 {
		transform: translateY(100%);
		transition: transform;
		animation: popup 0.5s cubic-bezier(0.3, 0.7, 0.4, 1.5) 1.3s forwards;
	}
	#logo2 {
		transform: translateY(100%);
		transition: transform;
		animation: popup 0.5s cubic-bezier(0.3, 0.7, 0.4, 1.5) 1.6s forwards;
	}
	#logo3 {
		transform: translateY(100%);
		transition: transform;
		animation: popup 0.5s cubic-bezier(0.3, 0.7, 0.4, 1.5) 1.9s forwards;
	}
	#logo4 {
		transform: translateY(100%);
		transition: transform;
		animation: popupI 0.5s cubic-bezier(0.3, 0.7, 0.4, 1.5) 2.2s forwards;
	}
	#logo5 {
		transform: translateY(100%);
		transition: transform;
		animation: popup 0.5s cubic-bezier(0.3, 0.7, 0.4, 1.5) 2.5s forwards;
	}
	#logo6 {
		transform: translateY(100%);
		transition: transform;
		animation: popup 0.5s cubic-bezier(0.3, 0.7, 0.4, 1.5) 2.8s forwards;
	}

	@keyframes popup {
		to {
			transform: translateY(0);
		}
	}
	@keyframes popupI {
		to {
			transform: translateY(0) translateX(6px);
		}
	}

	@keyframes fallover {
		/* to {
transform: rotate(90deg) translateY(100%);
} */
		50% {
			transform: rotate(90deg);
		}
		100% {
			transform: rotate(90deg) translateY(130%);
		}
	}
`;

// refactor to a smaller viewbox of 0 0 150 50 or something with that aprx aspect ratio
export function Logo() {
	const letters = ['o', 'n', 'g', 'v', 'i', 'e', 'w'];
	return (
		<svg css={styles} width="500px" height="128px" viewBox="0 0 128 256" id="logo" xmlns="http://www.w3.org/2000/svg">
			<path
				fill="none"
				strokeLinecap="round"
				strokeWidth="5"
				stroke="#000"
				id="logo-l"
				d="M 66, 250 L 166, 250 L 166, 6"
			/>
			{letters.map((l, i) => (
				<text id={'logo' + i} key={i} x={((i / 300) * 10000 - 115).toString()} fontSize="32" y="200">
					{l}
				</text>
			))}
		</svg>
	);
}
