export function FeatureSection({ featureText, featureIcon, leftAlign }) {
	const vw = Math.floor(window.innerWidth);
	const vh = Math.floor(window.innerHeight);
	const iconHeight = Math.floor(0.13 * vh + 32);
	const iconWidth = Math.floor(0.58 * vw + 32);
	const clipCoords = {
		start: leftAlign ? `0 0 ` : `0 ${iconHeight}`,
		firstCurveStart: leftAlign ? `${iconWidth - 16} 0` : `${vw - iconWidth - 16} ${iconHeight}`,
		firstCurve: leftAlign ? `16 16 0 0 1 ${iconWidth} 16 ` : `16 16 0 0 0 ${vw - iconWidth} ${iconHeight - 16}`,
		secondCurveStart: leftAlign ? `${iconWidth} ${iconHeight - 16}` : `${vw - iconWidth}  ${16}`,
		secondCurve: leftAlign ? `16 16 0 0 0 ${iconWidth + 16} ${iconHeight}` : `16 16 0 0 1 ${vw - iconWidth + 16} 0`,
		rightSide: leftAlign ? `${vw} ${iconHeight}` : `${vw} 0`,
		bottomRight: `${vw} ${vh * 0.65}`,
		bottomLeft: `0 ${vh * 0.65}`,
	};
	return (
		<section
			css={css`
				position: relative;
				top: ${leftAlign ? 'calc(0px - 44vh - 64px)' : 'calc((0px - 13vh - 32px))'};
				display: grid;
				grid-template-rows: auto;
				height: ${leftAlign ? '65vh' : 'calc(65vh + ' + iconHeight + 'px)'};
				padding: var(--med-padding);
				clip-path: path(
					'M ${clipCoords.start} L ${clipCoords.firstCurveStart} A ${clipCoords.firstCurve} L ${clipCoords.secondCurveStart} A ${clipCoords.secondCurve} L ${clipCoords.rightSide} L ${clipCoords.bottomRight} L 0 ${vh *
					0.65}'
				);

				background-color: ${leftAlign ? 'blue' : 'orange'};
				& .feature-section-icon {
					display: flex;
					justify-content: ${leftAlign ? 'start' : 'end'};
				}
			`}
		>
			<div className="feature-section-icon">
				<span style={{ backgroundColor: 'red', width: '58vw', height: '13vh' }}></span>
			</div>
			<aside className="feature-section-text">
				<p dangerouslySetInnerHTML={featureText}>
					{/* Keep track of different <em>Goals</em> and <em>Projects</em> while documenting your successes and challanges. */}
				</p>
			</aside>
		</section>
	);
}
