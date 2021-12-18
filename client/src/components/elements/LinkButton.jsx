export function LinkButton({ text, clickHandler, styleToken }) {
	return (
		<button
			css={css`
				padding: 8px;
				border-radius: 8px;
				border: none;
				background-color: transparent;
				font-size: 24px;
				color: var(--primary-color);

				&:focus:not(:focus-visible) {
					outline: none;
				}
			`}
			className="link-button"
			onClick={clickHandler}
		>
			{text}
		</button>
	);
}
