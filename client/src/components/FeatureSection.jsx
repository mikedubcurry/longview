import './css/FeatureSection.css';

export function FeatureSection({ featureText, featureIcon }) {
	return (
		<section className="feature-section">
			<div className="feature-section-icon"></div>
			<aside className="feature-section-text">
				<p dangerouslySetInnerHTML={featureText}>
					{/* Keep track of different <em>Goals</em> and <em>Projects</em> while documenting your successes and challanges. */}
				</p>
			</aside>
		</section>
	);
}
