export function MenuBtn({ openState }) {
	const [isOpen, setIsOpen] = openState;

	return (
		<button
			css={css`
				background-color: unset;
				border: none;

				// &:focus {
				// 	outline: 2px solid blue;
        //   outline-radius: 14px;
				// }

				.top-line,
				.bottom-line {
					transition: transform 0.2s ease;
					transform-origin: 50% 50%;
				}
				.open .top-line {
					transform: translateY(10%) translateX(-10%) rotate(45deg);
				}
				.open .bottom-line {
					transform: translateY(-10%) translateX(-10%) rotate(-45deg);
				}
			`}
			onClick={() => setIsOpen(!isOpen)}
		>
			<svg className={isOpen ? 'open' : ''} width="50px" height="50px" viewBox="0 0 100 100">
				<path strokeWidth="5" strokeLinecap="round" stroke="#000" className="top-line" d="M 5 35, l 90 0" />
				<path strokeWidth="5" strokeLinecap="round" stroke="#000" className="bottom-line" d="M 5, 65 l 90 0" />
			</svg>
		</button>
	);
}
