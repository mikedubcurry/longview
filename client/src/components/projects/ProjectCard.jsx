import { Card } from '../Card';
import './css/ProjectCard.css';
import { MilestoneSection } from './MilestoneSection';

export function ProjectCard({ project }) {
	return (
		<Card header={project.idea} text={project.description}>
			<p className="project-goal">{project.goal.goal}</p>
			{project.milestones.length && <MilestoneSection milestones={project.milestones} />}
		</Card>
	);
}

//
