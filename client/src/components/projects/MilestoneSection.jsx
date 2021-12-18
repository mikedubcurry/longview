import { useState } from 'react';

export function MilestoneSection({ milestones }) {
	const [expanded, setExpanded] = useState(false);

	return (
		// possibly use react-spring instead...
		// <CSSTransition in={expanded} classNames="expanded" timeout={200}>
		<div className={'project-milestone'} onClick={() => setExpanded(!expanded)}>
			{expanded ? (
				<ul className="milestones">
					{milestones.map((ms) => (
						<li key={ms.id} className={'milestone' + (ms.completed ? ' milestone-completed' : '')}>
							{ms.milestone}
						</li>
					))}
				</ul>
			) : (
				<span className="milestones project-milestone-progress-count">
					{milestones.filter((m) => m.completed).length} / {milestones.length} milestones complete
				</span>
			)}
			<progress
				className="project-milestone-progress"
				max={milestones.length}
				value={milestones.filter((i) => i.completed).length}
			/>
		</div>
		// </CSSTransition>
	);
}
