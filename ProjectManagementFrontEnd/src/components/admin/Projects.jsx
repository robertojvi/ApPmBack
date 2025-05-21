import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import ProjectForm from "./ProjectForm";

function Projects() {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showForm, setShowForm] = useState(false);
	const [selectedProject, setSelectedProject] = useState(null);

	const fetchProjects = async () => {
		setLoading(true);
		setError(null);
		try {
			let response = await fetch("/api/projects/list");
			if (!response.ok) {
				try {
					response = await fetch("http://localhost:8080/api/projects/list");
					if (!response.ok)
						throw new Error(`HTTP error! status: ${response.status}`);
				} catch (networkError) {
					throw new Error("Could not reach backend server");
				}
			}
			const data = await response.json();
			setProjects(data);
		} catch (error) {
			console.error("Error fetching projects:", error);
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProjects();
	}, []);

	const handleEdit = (project) => {
		setSelectedProject(project);
		setShowForm(true);
	};

	const handleCloseForm = () => {
		setShowForm(false);
		setSelectedProject(null);
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className="projects-container" style={{ color: "black" }}>
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
					onClose={handleCloseForm}
					onProjectCreated={fetchProjects}
					initialData={selectedProject}
					isEditing={!!selectedProject}
				/>
			)}

			<table
				style={{
					width: "100%",
					borderCollapse: "collapse",
					marginTop: "1rem",
					color: "black",
				}}
			>
				<thead>
					<tr style={{ backgroundColor: "#f4f4f4" }}>
						<th
							style={{
								padding: "12px",
								textAlign: "left",
								borderBottom: "2px solid #ddd",
								color: "black",
							}}
						>
							Name
						</th>
						<th
							style={{
								padding: "12px",
								textAlign: "left",
								borderBottom: "2px solid #ddd",
								color: "black",
							}}
						>
							Status
						</th>
						<th
							style={{
								padding: "12px",
								textAlign: "left",
								borderBottom: "2px solid #ddd",
								color: "black",
							}}
						>
							Contractor
						</th>
						<th
							style={{
								padding: "12px",
								textAlign: "right",
								borderBottom: "2px solid #ddd",
								color: "black",
							}}
						>
							% Complete
						</th>
						<th
							style={{
								padding: "12px",
								textAlign: "center",
								borderBottom: "2px solid #ddd",
								color: "black",
							}}
						>
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{projects.map((project) => (
						<tr
							key={project.id}
							style={{ borderBottom: "1px solid #ddd", color: "black" }}
						>
							<td style={{ padding: "12px" }}>{project.name}</td>
							<td style={{ padding: "12px" }}>{project.status}</td>
							<td style={{ padding: "12px" }}>{project.contractor?.name}</td>
							<td style={{ padding: "12px", textAlign: "right" }}>
								{project.percentageComplete?.toFixed(2)}%
							</td>
							<td style={{ padding: "12px", textAlign: "center" }}>
								<FaEdit
									style={{ cursor: "pointer", marginRight: "10px" }}
									onClick={() => handleEdit(project)}
								/>
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
