import { Link, useLocation } from 'react-router-dom';

import { Card } from '../elements/Card';
import './css/ProjectCard.css';
import { MilestoneSection } from './MilestoneSection';

export function ProjectCard({ project }) {
	const { pathname } = useLocation();

	const onProjectIdPage = pathname === `/projects/${project.id}`;
	const headerLink = onProjectIdPage ? project.idea : <Link to={`/projects/${project.id}`}>{project.idea}</Link>;

	return (
		<Card header={headerLink} text={project.description}>
			<p className="project-goal">{project.goal.goal}</p>
			{project.milestones.length && <MilestoneSection milestones={project.milestones} />}
		</Card>
	);
}

//
