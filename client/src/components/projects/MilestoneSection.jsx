import { useState } from 'react';

export function MilestoneSection({ milestones }) {
	const [expanded, setExpanded] = useState(false);

	if (expanded) {
		return (
			<div className="project-milestone" onClick={() => setExpanded(false)}>
				{milestones.map((ms) => (
          <p key={ms.id} className={'milestone' + (ms.completed ? ' milestone-completed' : '')}>{ms.milestone}</p>
          ))}
          <progress
            className="project-milestone-progress"
            max={milestones.length}
            value={milestones.filter((i) => i.completed).length}
          />
			</div>
		);
	}
	return (
		<div className="project-milestone" onClick={() => setExpanded(true)}>
			<span className="project-milestone-progress-count">
				{milestones.filter((m) => m.completed).length} / {milestones.length} milestones complete
			</span>
			<progress
				className="project-milestone-progress"
				max={milestones.length}
				value={milestones.filter((i) => i.completed).length}
			/>
		</div>
	);
}
