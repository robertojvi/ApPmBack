import React, { useState, useEffect } from "react";

function Dashboard() {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				let response = await fetch("/api/projects/list");
				if (!response.ok) {
					response = await fetch("http://localhost:8080/api/projects/list");
					if (!response.ok) throw new Error("Failed to fetch projects");
				}
				const data = await response.json();
				setProjects(data);
				setLoading(false);
			} catch (err) {
				setError(err.message);
				setLoading(false);
			}
		};

		fetchProjects();
	}, []);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className="dashboard-container">
			<h2>Project Dashboard</h2>
			<div className="dashboard-content">
				<div className="stats-container">
					<div className="stats-card">
						<h4>Total Projects</h4>
						<div className="stats-number">{projects.length}</div>
					</div>
				</div>

				<div className="projects-list-container">
					<h3>All Projects</h3>
					<div className="projects-list">
						<div className="project-item header">
							<span className="project-name">Project Name</span>
							<span className="completed-percentage">Progress</span>
							<span className="project-status">Status</span>
							<span className="project-provider">Provider</span>
							<span className="circuit-status">Circuit Status</span>
							<span className="contractor-name">Contractor</span>
						</div>
						{projects.map((project) => (
							<div key={project.id} className="project-item">
								<span className="project-name">{project.name}</span>
								<span className="completed-percentage">
									{project.percentageComplete}%
								</span>
								<span className="project-status">{project.status}</span>
								<span className="project-provider">
									{project.fiberCircuit?.providerName}
								</span>
								<span className="circuit-status">
									{project.fiberCircuit?.circuitStatus}
								</span>
								<span className="contractor-name">
									{project.contractor?.name}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
