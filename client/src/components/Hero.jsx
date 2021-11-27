export function Hero({ title, subtitle, bgImage, children }) {
	return (
		<section
			css={css`
				height: 75vh;
				padding: 1rem;

				display: flex;
				flex-direction: column;
				justify-content: space-evenly;
				align-items: center;

				background-color: rgba(33, 128, 119);

				& > h1 {
					flex: 1;

					font-size: 32px;

					color: #ffffff;
					background: linear-gradient(to bottom right, #ffffff, 50%, #fbff00);
					-webkit-background-clip: text;
					background-clip: text;
					-webkit-text-fill-color: transparent;
				}

				& > .subtitle {
					width: 50%;

					flex: 2;

					font-size: 24px;
					line-height: 1.65;

					color: #ffffff;
				}
			`}
		>
			<h1>{title}</h1>
			<div className="subtitle">
				<p>{subtitle}</p>
			</div>
			{children}
		</section>
	);
}

/*
  bgImage prop will be 
  { srcset: string[]; alt: string; }
*/
