const styles = css`
	position: relative;
	top: -7px;
	left: -5px;
	#logo-l {
		transform-origin: 90% 82%;
		animation: fallover 1s ease forwards;
	}

	#logo0 {
		-webkit-transform: translateY(150%);
		-ms-transform: translateY(150%);
		-moz-transform: translateY(150%);
		-o-transform: translateY(150%);
		transform: translateY(150%);
		transition: transform;
		animation: popup 0.5s cubic-bezier(0.3, 0.7, 0.4, 1.5) 1s forwards;
	}
	#logo1 {
		-webkit-transform: translateY(150%);
		-ms-transform: translateY(150%);
		-moz-transform: translateY(150%);
		-o-transform: translateY(150%);
		transform: translateY(150%);
		transition: transform;
		animation: popup 0.5s cubic-bezier(0.3, 0.7, 0.4, 1.5) 1.3s forwards;
	}
	#logo2 {
		-webkit-transform: translateY(150%);
		-ms-transform: translateY(150%);
		-moz-transform: translateY(150%);
		-o-transform: translateY(150%);
		transform: translateY(150%);
		transition: transform;
		animation: popup 0.5s cubic-bezier(0.3, 0.7, 0.4, 1.5) 1.6s forwards;
	}
	#logo3 {
		-webkit-transform: translateY(150%);
		-ms-transform: translateY(150%);
		-moz-transform: translateY(150%);
		-o-transform: translateY(150%);
		transform: translateY(150%);
		transition: transform;
		animation: popup 0.5s cubic-bezier(0.3, 0.7, 0.4, 1.5) 1.9s forwards;
	}
	#logo4 {
		-webkit-transform: translateY(150%);
		-ms-transform: translateY(150%);
		-moz-transform: translateY(150%);
		-o-transform: translateY(150%);
		transform: translateY(150%);
		transition: transform;
		animation: popupI 0.5s cubic-bezier(0.3, 0.7, 0.4, 1.5) 2.2s forwards;
	}
	#logo5 {
		-webkit-transform: translateY(150%);
		-ms-transform: translateY(150%);
		-moz-transform: translateY(150%);
		-o-transform: translateY(150%);
		transform: translateY(150%);
		transition: transform;
		animation: popup 0.5s cubic-bezier(0.3, 0.7, 0.4, 1.5) 2.5s forwards;
	}
	#logo6 {
		-webkit-transform: translateY(150%);
		-ms-transform: translateY(150%);
		-moz-transform: translateY(150%);
		-o-transform: translateY(150%);
		transform: translateY(150%);
		transition: transform;
		animation: popup 0.5s cubic-bezier(0.3, 0.7, 0.4, 1.5) 2.8s forwards;
	}

	@keyframes popup {
		to {
			-webkit-transform: translateY(-15%);
			-ms-transform: translateY(-15%);
			-moz-transform: translateY(-15%);
			-o-transform: translateY(-15%);
			transform: translateY(-15%);
		}
	}
	@keyframes popupI {
		to {
			-webkit-transform: translateY(-15%) translateX(6px);
			-ms-transform: translateY(-15%) translateX(6px);
			-moz-transform: translateY(-15%) translateX(6px);
			-o-transform: translateY(-15%) translateX(6px);
			transform: translateY(-15%) translateX(6px);
		}
	}

	@keyframes fallover {
		50% {
			-webkit-transform: rotate(90deg) translateY(0%);
			-ms-transform: rotate(90deg) translateY(0%);
			-moz-transform: rotate(90deg) translateY(0%);
			-o-transform: rotate(90deg) translateY(0%);
			transform: rotate(90deg) translateY(0%);
		}
		100% {
			-webkit-transform: rotate(90deg) translateY(100%);
			-ms-transform: rotate(90deg) translateY(100%);
			-moz-transform: rotate(90deg) translateY(100%);
			-o-transform: rotate(90deg) translateY(100%);
			transform: rotate(90deg) translateY(100%);
		}
	}
`;

// refactor to a smaller viewbox of 0 0 150 50 or something with that aprx aspect ratio
export function Logo() {
	const letters = ['o', 'n', 'g', 'v', 'i', 'e', 'w'];
	return (
		<svg
			aria-label="Longview logo"
			css={styles}
			width="200px"
			height="100px"
			viewBox="0 0 128 256"
			id="logo"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill="none"
				strokeLinecap="round"
				strokeWidth="5"
				stroke="#000"
				id="logo-l"
				d="M 0, 210 l 100, 0 l 0, -270"
			/>
			{letters.map((l, i) => (
				<text id={'logo' + i} key={i} x={((i / 300) * 10000 - 115).toString()} fontSize="48" y="180">
					{l}
				</text>
			))}
		</svg>
	);
}
