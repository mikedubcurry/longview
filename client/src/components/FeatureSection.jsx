import { useState } from 'react';
import { useEffect } from 'react';

const styles = (leftAlign) => css`
	height: 80vh;
	display: grid;
	grid-template-rows: calc(13vh + var(--med-padding) * 2) auto;
	background-color: ${leftAlign ? 'blue' : 'orange'};
	.feature-section-icon {
		background-color: ${leftAlign ? 'orange' : 'rgb(33, 128, 119)'};

		.icon {
			float: ${leftAlign ? 'left' : 'right'};
			width: 58%;
			height: 100%;
			background-color: ${leftAlign ? 'blue' : 'orange'};
			border-radius: ${leftAlign ? '0 var(--med-padding) 0 0' : 'var(--med-padding) 0 0 0'};
			display: flex;
			justify-content: center;
			align-items: center;
			padding: var(--med-padding);

			.svg-progress-amount1 {
				transition: all .5s ease 0s;
			}
			.svg-progress-amount2 {
				transition: all .5s ease .5s
			}
			.svg-progress-amount3 {
				transition: all .5s ease 1s
			}
			#svg-progress:hover .svg-progress-amount1,#svg-progress:hover .svg-progress-amount2,#svg-progress:hover .svg-progress-amount3{
				stroke-dashoffset: 0;
			}
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
			background-color: ${leftAlign ? 'blue' : 'orange'};
			// background-color: red;
			bottom: 0;
			width: calc(var(--med-padding));
			height: calc(var(--med-padding));
			left: ${leftAlign ? '0' : 'calc(100% - var(--med-padding))'};
		}
	}

	.feature-section-text {
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
				<p dangerouslySetInnerHTML={featureText}>
					{/* Keep track of different <em>Goals</em> and <em>Projects</em> while documenting your successes and challanges. */}
				</p>
			</aside>
		</section>
	);
}
