// import './css/BaseButton.css';

export function BaseButton({ text, clickHandler, styleToken }) {
	return (
		<button
			css={css`
				padding: 8px;
				font-size: 24px;
				border-radius: 8px;
				border: none;

				&:focus:not(:focus-visible) {
					outline: none;
				}
			`}
			className="base-button"
			onClick={clickHandler}
		>
			{text}
		</button>
	);
}
