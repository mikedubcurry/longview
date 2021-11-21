export function FeatureSection({ featureText, featureIcon }) {
	return (
		<section
			css={css`
				height: 45vh;
				background-image: linear-gradient(to bottom right, #218077, 25%, #ab6ceb);
			`}
		>
			<div className="feature-section-icon"></div>
			<aside className="feature-section-text">
				<p dangerouslySetInnerHTML={featureText}>
					{/* Keep track of different <em>Goals</em> and <em>Projects</em> while documenting your successes and challanges. */}
				</p>
			</aside>
		</section>
	);
}
