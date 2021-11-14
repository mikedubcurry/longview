import {Link} from 'react-router-dom'

export function Goals({}) {
	const goals = [
		{
			goal: 'Get better at React',
			id: '1',
		},
		{
			goal: 'Learn a second language',
			id: '2',
		},
		{
			goal: 'Relax and take a break from coding every now and then',
			id: '3',
		},
		{
			goal: 'Practice CSS',
			id: '4',
		},
	];
	return (
		<main>
			<h1>Goals</h1>
			{goals.map((g) => (
				<div key={g.id} className="goal">
                    <Link to={`/goals/${g.id}`}>
					{g.goal}
                    </Link>
				</div>
			))}
		</main>
	);
}
