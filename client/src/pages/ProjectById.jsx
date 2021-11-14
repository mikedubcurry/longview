import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProjectCard } from '../components/projects/ProjectCard';

export function ProjectById() {
	const projects = [
		{
			idea: 'Finish Longview App',
			description: 'The backend has a lot done but the front end needs some work',
			goalId: '1',
			goal: {
				goal: 'Get better at React',
				id: '1',
			},
			milestones: [
				{
					milestone: 'MVP backend with tests',
					completed: true,
					projectId: '1',
					id: '1',
				},
				{
					milestone: 'MVP fronend with auth',
					completed: false,
					projectId: '1',
					id: '2',
				},
				{
					milestone: 'all api endpoints connected to frontend',
					completed: false,
					projectId: '1',
					id: '3',
				},
				{
					milestone: 'deploy on hosted server',
					completed: false,
					projectId: '1',
					id: '4',
				},
			],
			status: 'active',
			id: '1',
		},
		{
			idea: 'Beat Pokemon Crystal',
			description: 'get all 16 badges and beat Red after catching all legendaries',
			goalId: '3',
			goal: {
				goal: 'Relax and take a break from coding every now and then',
				id: '3',
			},
			milestones: [
				{
					milestone: 'get all 16 badges',
					completed: false,
					projectId: '2',
					id: '5',
				},
				{
					milestone: 'catch both legendary birds',
					completed: false,
					projectId: '2',
					id: '6',
				},
				{
					milestone: 'catch legendary dogs',
					completed: false,
					projectId: '2',
					id: '7',
				},
				{
					milestone: 'beat red',
					completed: false,
					projectId: '2',
					id: '8',
				},
			],
			status: 'active',
			id: '2',
		},
		{
			idea: 'Redesign mikecurry.dev',
			description:
				"You've learned some more CSS since deploying the site and you should update the site to refect that",
			goalId: '4',
			goal: {
				goal: 'Practice CSS',
				id: '4',
			},
			status: 'on-hold',
			id: '3',
		},
	];
  
	const { projectId } = useParams();

	const [project, setProject] = useState(null);

	useEffect(() => {
		if (!project) {
			setProject(...projects.filter((p) => p.id === projectId));
		}
	}, [project]);

	return <div>{project && <ProjectCard project={project} />} </div>;
}
