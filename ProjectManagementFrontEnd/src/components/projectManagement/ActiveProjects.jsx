import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function ActiveProjects() {
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

	const liveProjects = projects.filter((project) => project.status === "Live");
	const otherProjects = projects.filter((project) => project.status !== "Live");

	const chartData = {
		labels: ["Live Projects", "Other Projects"],
		datasets: [
			{
				data: [liveProjects.length, otherProjects.length],
				backgroundColor: [
					"#f4b942", // Gold color for Live Projects
					"rgba(3, 50, 68, 0.8)", // Navy blue with opacity for Other Projects
				],
				borderColor: ["#f4b942", "#033244"],
				borderWidth: 1,
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
				labels: {
					color: "#033244", // Dark blue color for legend text
				},
			},
			title: {
				display: true,
				text: `Live Projects: ${liveProjects.length}`,
				color: "#033244", // Dark blue color for title
			},
		},
	};

	return (
		<div className="active-projects-container">
			<h2>Active Projects Overview</h2>
			<div className="active-projects-content">
				<div className="chart-container">
					<Pie data={chartData} options={options} />
				</div>
				<div className="projects-lists">
					<div className="live-projects-list">
						<h3>Live Projects ({liveProjects.length})</h3>
						<div className="list-container">
							{liveProjects.map((project) => (
								<div key={project.id} className="live-project-item">
									{project.name}
								</div>
							))}
						</div>
					</div>
					<div className="other-projects-list">
						<h3>Other Projects ({otherProjects.length})</h3>
						<div className="list-container">
							{otherProjects.map((project) => (
								<div key={project.id} className="other-project-item">
									{project.name} ({project.status})
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ActiveProjects;
