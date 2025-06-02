import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function CompletedProjects() {
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
		labels: [...liveProjects.map((project) => project.name), "Other Projects"],
		datasets: [
			{
				data: [...liveProjects.map(() => 1), otherProjects.length],
				backgroundColor: [
					...liveProjects.map(() => "#f4b942"),
					"rgba(3, 50, 68, 0.8)",
				],
				borderColor: [...liveProjects.map(() => "#f4b942"), "#033244"],
				borderWidth: 1,
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "right",
				labels: {
					color: "#033244",
				},
			},
			title: {
				display: true,
				text: "Project Status Distribution",
				color: "#033244",
			},
			tooltip: {
				callbacks: {
					label: function (context) {
						return context.label;
					},
				},
			},
		},
	};

	return (
		<div className="completed-projects-container">
			<h2>Projects Status Overview</h2>
			<div className="chart-section">
				<div className="chart-container">
					<Pie data={chartData} options={options} />
				</div>
			</div>

			<div className="live-projects-table-container">
				<h3>Live Projects Details</h3>
				<table className="live-projects-table">
					<thead>
						<tr>
							<th>Project Name</th>
							<th>Contractor</th>
							<th>Start Date</th>
							<th>End Date</th>
							<th>FOM</th>
							<th>Project Manager</th>
							<th>Implementation Engineer</th>
						</tr>
					</thead>
					<tbody>
						{liveProjects.map((project) => (
							<tr key={project.id}>
								<td>{project.name}</td>
								<td>{project.contractor?.name}</td>
								<td>{project.startDate}</td>
								<td>{project.endDate}</td>
								<td>{project.fom?.name}</td>
								<td>{project.projectManager?.name}</td>
								<td>{project.impEngineer?.name}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default CompletedProjects;
