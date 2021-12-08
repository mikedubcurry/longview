import { useState } from 'react';
import { useEffect } from 'react';

const styles = (leftAlign) => css`
	height: 80vh;
	display: grid;
	grid-template-rows: calc(13vh + var(--med-padding) * 2) auto;
	background-color: ${leftAlign ? 'darkblue' : 'orange'};
	background-image: ${leftAlign
		? 'linear-gradient( to top left, blue , darkblue 50%)'
		: 'linear-gradient(to top right	,lightcoral , orange 25%)'};

	.feature-section-icon {
		background-color: ${leftAlign ? 'orange' : 'rgb(33, 128, 119)'};


		.icon {
			float: ${leftAlign ? 'left' : 'right'};
			width: 58%;
			height: 100%;
			background-color: ${leftAlign ? 'darkblue' : 'orange'};
			background-image: ${leftAlign
				? 'linear-gradient( to bottom right, blue , darkblue 50%)'
				: 'linear-gradient(to bottom left	,lightcoral , orange 50%)'};
			border-radius: ${leftAlign ? '0 var(--med-padding) 0 0' : 'var(--med-padding) 0 0 0'};
			display: flex;
			justify-content: center;
			align-items: center;
			padding: var(--med-padding);
		}
		.convex-corner {
			position: relative;
			float: ${leftAlign ? 'right' : 'left'};
			width: 42%;
			height: 100%;
		}
		.convex-corner::after {
			position: absolute;
			content: '';
			left: ${leftAlign ? '' : 'calc(100% - var(--med-padding) * 2)'};
			top: calc(100% - var(--med-padding) * 2);
			border-radius: 100%;
			width: calc(var(--med-padding) * 2);
			height: calc(var(--med-padding) * 2);
			background-color: ${leftAlign ? 'orange' : 'rgb(33, 128, 119)'};
		}

		.convex-corner::before {
			position: absolute;
			content: '';
			background-color: ${leftAlign ? 'darkblue' : 'orange'};
			// background-color: red;
			bottom: 0;
			width: calc(var(--med-padding));
			height: calc(var(--med-padding));
			left: ${leftAlign ? '0' : 'calc(100% - var(--med-padding))'};
		}
	}

	.feature-section-text {
		color: ${leftAlign ? '#eee' : '#222'};
		padding: var(--med-padding);
	}
`;

export function FeatureSection({ featureText, featureIcon, leftAlign }) {
	return (
		<section css={styles(leftAlign)}>
			<div className="feature-section-icon">
				<div className="convex-corner"></div>
				<div className="icon">{featureIcon}</div>
			</div>
			<aside className="feature-section-text">
				<p dangerouslySetInnerHTML={featureText}></p>
			</aside>
		</section>
	);
}
