// import './css/BaseButton.css';

export function BaseButton({ text, clickHandler, styleToken }) {
	return (
		<button
			css={css`
				position: relative;
				top: 0;

				background: transparent;
				cursor: pointer;

				border: none;
				border-radius: 0.25rem;
				padding: 0;

				transition: filter 250ms;

				-webkit-tap-highlight-color: transparent;
				user-select: none;

				.shadow {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					border-radius: 12px;
					background: hsl(0deg 0% 0% / 0.25);
					transform: translateY(2px);
					filter: blur(8px);
					transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
				}

				.edge {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					border-radius: 12px;
					background: linear-gradient(
						to left,
						var(--btn-color-dark) 0%,
						var(--btn-color-edge) 8%,
						var(--btn-color-edge) 92%,
						var(--btn-color-dark) 100%
					);
				}
				.front {
					display: block;
					position: relative;
					padding: 0.25rem 1rem;
					border-radius: 12px;
					font-size: 1.25rem;
					will-change: transform;
					background: var(--btn-color);
					transform: translateY(-2px);
					transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
				}

				&:hover .front {
					transform: translateY(-4px);
					transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
				}
				&:hover .shadow {
					transform: translateY(4px);

					transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
				}
				&:active .front {
					transform: translateY(-2px);
					transition: transform 34ms;
				}
				&:active .shadow {
					transform: translateY(1px);
					transition: transform 34ms;
				}

				&:focus:not(:focus-visible) {
					outline: none;
				}
			`}
			className="base-button"
			onClick={clickHandler}
		>
			<span className="shadow"></span>
			<span style={styleToken ? styleToken : {}} className="edge"></span>
			<span style={styleToken ? styleToken : {}} className="front">
				{text}
			</span>
		</button>
	);
}
