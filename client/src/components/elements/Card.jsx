// import './css/Card.css';

export function Card({ header, text, children }) {
	return (
		<div
			css={css`
				& {
					margin-bottom: 1rem;
					min-width: 500px;
					max-width: fit-content;
					padding: 1.25rem 1rem;
					border-radius: 6px;

					display: flex;
					flex-direction: column;
					align-items: flex-start;

					background-color: var(--base-card-bg);

					transition: background-color 0.25s ease;
				}

				.card:hover {
					background-color: var(--base-card-hover);
				}

				& header {
					color: black;
					font-size: 24px;
					text-decoration: underline;
					text-decoration-thickness: 1px;
					align-self: flex-start;
				}

				& header a {
					color: unset;
					text-decoration: none;
					transition: color 0.3s ease;
				}

				& header a:hover {
					color: blue;
				}

				& .card-text {
					align-self: flex-start;
				}

				.card-content {
					width: 100%;
					padding: 1rem;
					margin-top: 0.5rem;
					border-radius: 4px;

					/* background-color: var(--base-card-subsection-bg); */

					display: flex;
					flex-direction: column;
				}
			`}
		>
			<header className="card-header">{header}</header>
			<div className="card-text">{text}</div>
			<div className="card-content">{children}</div>
		</div>
	);
}
