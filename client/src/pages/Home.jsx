import { FeatureSection } from '../components/FeatureSection';
import { Hero } from '../components/Hero';

export function Home() {
	return (
		<>
			<Hero title="Longview" subtitle="Keeping track of all the things so you don't have to."></Hero>
			<main>
				<FeatureSection
					featureText={{
						__html:
							'Keep track of different <em>Goals</em> and <em>Projects</em> while documenting your successes andchallanges.',
					}}
				/>

				<FeatureSection
					featureText={{
						__html:
							'Coming soon, allow other users to join in a group and collaborate with shared <em>Goals</em> and <em>Projects</em>',
					}}
				/>
			</main>
		</>
	);
}
