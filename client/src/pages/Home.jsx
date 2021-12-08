import { useRef, useState } from 'react';
import { FeatureSection } from '../components/FeatureSection';
import { Hero } from '../components/Hero';

export function Home() {
	return (
		<>
			<Hero title="Longview" subtitle="Keeping track of all the things so you don't have to."></Hero>
			<main>
				<FeatureSection
					// add featureIcon svg
					featureText={{
						__html:
							'Keep track of different <em>Goals</em> and <em>Projects</em> while documenting your successes andchallanges.',
					}}
					featureIcon={Checklist()}
				/>

				<FeatureSection
					// add featureIcon svg
					leftAlign={true}
					featureText={{
						__html:
							'Coming soon, allow other users to join in a group and collaborate with shared <em>Goals</em> and <em>Projects</em>',
					}}
					featureIcon={Progress()}
				/>
			</main>
		</>
	);
}

function Checklist() {
	return (
		<svg css={css`
			.checks, .boxes, .lines {
				transition: all .3s ease;
			}
			&:hover .checks {
				stroke: green;
			}
			&:hover .boxes {
				stroke: yellow;
			}
			&:hover .lines {
				stroke: #444;
			}
		`} width="100%" height="100%" viewBox="0 0 150 100" xmlns="http://www.w3.org/2000/svg">
			<path
				fill="none"
				stroke="#ddd"
				strokeWidth="5px"
				strokeLinecap="round"
				d="m5 10 a 4 4 0 0 1 5 -5l 50 0a 4 4 0 0 1 5 5l0 75a5 5 0 0 1 -5 5l-50 0a 5 5 0 0 1 -5 -5z"
			/>
			<path
				fill="none"
				stroke="#ddd"
				className="lines"
				strokeWidth="5px"
				strokeLinecap="round"
				d="m15 20 l 40 0 m -40 10 l 15 0 m 10 0 l 15 0 m -40 10 l 40 0m -40 10 l 40 0m -40 10 l 15 0 m 10 0 l 15 0 m -40 10 l 40 0m -40 10 l 40 0"
			/>
			<path
				fill="none"
				className="checks"
				stroke="#ddd"
				strokeWidth="5px"
				strokeLinecap="round"
				d="m75 25 l 5 5 l 15 -20 m-20 40l 5 5 l 15 -20m-20 40l 5 5 l 15 -20m25 -35 l 5 5 l 15 -20"
			/>
			<path
				fill="none"
				className="boxes"
				stroke="#ddd"
				strokeWidth="5px"
				strokeLinecap="round"
				d=" m120 45 l 10 0l0 10 l -10 0 l 0 -10z m 0 25 l 10 0l0 10 l -10 0 l 0 -10z"
			/>
		</svg>
	);
}

function Progress() {
	return (
		<svg
			css={css`
				.svg-progress-amount1 {
					transition: all 0.5s ease 0s;
				}
				.svg-progress-amount2 {
					transition: all 0.5s ease 0.5s;
				}
				.svg-progress-amount3 {
					transition: all 0.5s ease 1s;
				}
				&:hover .svg-progress-amount1,
				&:hover .svg-progress-amount2,
				&:hover .svg-progress-amount3 {
					stroke-dashoffset: 0;
				}
			`}
			id="svg-progress"
			width="100%"
			height="100%"
			viewBox="0 0 150 100"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				stroke="#ddd"
				strokeWidth="6px"
				strokeLinecap="round"
				d="m0 15 l 150 0 m 0 0 l 0 6 m 0 0l -150 0m0 0l 0 -6"
			/>
			<path
				className="svg-progress-amount1"
				stroke="#0a7"
				strokeWidth="5px"
				strokeLinecap="round"
				pathLength="10"
				strokeDasharray="10"
				strokeDashoffset="9"
				d="m3 18 l 145 0"
			/>
			<path
				stroke="#ddd"
				strokeWidth="6px"
				strokeLinecap="round"
				d="m0 45 l 150 0 m 0 0 l 0 6 m 0 0l -150 0m0 0l 0 -6"
			/>
			<path
				className="svg-progress-amount2"
				stroke="#0a7"
				strokeWidth="5px"
				strokeLinecap="round"
				pathLength="10"
				strokeDasharray="10"
				strokeDashoffset="9"
				d="m3 48 l 145 0"
			/>
			<path
				stroke="#ddd"
				strokeWidth="6px"
				strokeLinecap="round"
				d="m0 75 l 150 0 m 0 0 l 0 6 m 0 0l -150 0m0 0l 0 -6"
			/>
			<path
				className="svg-progress-amount3"
				stroke="#0a7"
				strokeWidth="5px"
				strokeLinecap="round"
				pathLength="10"
				strokeDasharray="10"
				strokeDashoffset="9"
				d="m3 78 l 145 0"
			/>
		</svg>
	);
}
