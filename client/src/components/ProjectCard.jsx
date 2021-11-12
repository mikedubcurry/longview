import { Card } from './Card';
import './css/ProjectCard.css';

export function ProjectCard({ project }) {
	return (
		<Card header={project.idea} text={project.description}>
			<p className="project-goal">{project.goal.goal}</p>
			{project.milestones.length && (
				<>
					<span className="project-progress-count">
						{project.milestones.filter((m) => m.completed).length} / {project.milestones.length} milestones complete
					</span>
					<progress
						className="project-progress"
						max={project.milestones.length}
						value={project.milestones.filter((i) => i.completed).length}
					/>
				</>
			)}
		</Card>
	);
}

//
