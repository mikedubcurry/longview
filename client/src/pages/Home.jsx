import { Hero } from '../components/Hero';

export function Home() {
	return (
		<>
			<Hero title="Longview" subtitle="Keeping track of all the things so you don't have to."></Hero>
			<main>
				<section>
					<div>{/* svg animation thing */}</div>
					<aside>
						<p>
							Keep track of different <em>Goals</em> and <em>Projects</em> while documenting your successes and
							challanges.
						</p>
					</aside>
				</section>
				<section>
					<div>
						{/* svg animation thing */}
						<aside>
							<p>
								Coming soon, allow other users to join in a group and collaborate with shared <em>Goals</em> and
								<em>Projects</em>
							</p>
						</aside>
					</div>
				</section>
			</main>
		</>
	);
}
