import React, { useEffect, useState } from "react";
import ProjectForm from "./ProjectForm";
import { FaEdit, FaTrash } from "react-icons/fa";

function Projects() {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showForm, setShowForm] = useState(false);

	const fetchProjects = async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetch("/api/projects/list");
			if (!response.ok)
				throw new Error(`HTTP error! status: ${response.status}`);
			const data = await response.json();
			setProjects(data);
		} catch (error) {
			console.error("Error fetching Projects:", error);
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProjects();
	}, []);

	const refreshProjects = () => {
		fetchProjects();
	};

	if (loading) return <div style={{ color: "black" }}>Loading...</div>;
	if (error) return <div style={{ color: "black" }}>Error: {error}</div>;

	return (
		<div style={{ color: "black" }}>
			<h2>Projects List</h2>
			<button
				onClick={() => setShowForm(true)}
				style={{
					padding: "8px 16px",
					backgroundColor: "#4CAF50",
					color: "white",
					border: "none",
					borderRadius: "4px",
					cursor: "pointer",
					marginBottom: "1rem",
				}}
			>
				Create New Project
			</button>
			{showForm && (
				<ProjectForm
					onClose={() => setShowForm(false)}
					onProjectCreated={refreshProjects}
				/>
			)}
			<table
				style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}
			>
				<thead>
					<tr style={{ backgroundColor: "#f4f4f4" }}>
						<th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Name</th>
						<th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Status</th>
						<th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Start Date</th>
						<th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>End Date</th>
						<th style={{ padding: "12px", textAlign: "center", borderBottom: "2px solid #ddd" }}>Actions</th>
					</tr>
				</thead>
				<tbody>
					{projects.map((project) => (
						<tr key={project.id} style={{ borderBottom: "1px solid #ddd" }}>
							<td style={{ padding: "12px" }}>{project.name}</td>
							<td style={{ padding: "12px" }}>{project.status}</td>
							<td style={{ padding: "12px" }}>{project.startDate}</td>
							<td style={{ padding: "12px" }}>{project.endDate}</td>
							<td style={{ padding: "12px", textAlign: "center" }}>
								<FaEdit style={{ cursor: "pointer", marginRight: "10px" }} />
								<FaTrash style={{ cursor: "pointer" }} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Projects;
