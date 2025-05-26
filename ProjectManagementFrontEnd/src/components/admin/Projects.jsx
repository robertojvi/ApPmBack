import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import ProjectForm from "./ProjectForm";

function Projects() {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showForm, setShowForm] = useState(false);
	const [selectedProject, setSelectedProject] = useState(null);
	const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

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

	const handleDelete = async (projectId) => {
		if (!window.confirm("Are you sure you want to delete this project?")) {
			return;
		}

		try {
			let response;
			try {
				response = await fetch(`/api/projects/${projectId}`, {
					method: "DELETE",
				});
			} catch (networkError) {
				response = await fetch(
					`http://localhost:8080/api/projects/${projectId}`,
					{
						method: "DELETE",
					}
				);
			}

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			// Refresh projects list after successful deletion
			fetchProjects();
		} catch (error) {
			console.error("Error deleting project:", error);
			setError("Failed to delete project. Please try again.");
		}
	};

	const sortData = (key) => {
		let direction = "asc";
		if (sortConfig.key === key && sortConfig.direction === "asc") {
			direction = "desc";
		}
		setSortConfig({ key, direction });

		const sortedData = [...projects].sort((a, b) => {
			// Handle nested properties
			if (key === "contractor" || key === "fiberCircuit") {
				const aValue = a[key]?.name || a[key]?.providerName || "";
				const bValue = b[key]?.name || b[key]?.providerName || "";
				if (aValue < bValue) return direction === "asc" ? -1 : 1;
				if (aValue > bValue) return direction === "asc" ? 1 : -1;
				return 0;
			}
			// Handle regular properties
			if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
			if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
			return 0;
		});
		setProjects(sortedData);
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div style={{ color: "black" }}>
			<h2
				style={{
					textAlign: "center",
					marginBottom: "2rem",
					textTransform: "uppercase",
					fontSize: "2rem",
					fontWeight: "600",
				}}
			>
				Projects
			</h2>
			<button
				onClick={() => {
					setShowForm(true);
					setSelectedProject(null);
				}}
				className="action-button"
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
								cursor: "pointer",
							}}
							onClick={() => sortData("name")}
						>
							Name{" "}
							{sortConfig.key === "name" &&
								(sortConfig.direction === "asc" ? "↑" : "↓")}
						</th>
						<th
							style={{
								padding: "12px",
								textAlign: "left",
								borderBottom: "2px solid #ddd",
								color: "black",
								cursor: "pointer",
							}}
							onClick={() => sortData("status")}
						>
							Status{" "}
							{sortConfig.key === "status" &&
								(sortConfig.direction === "asc" ? "↑" : "↓")}
						</th>
						<th
							style={{
								padding: "12px",
								textAlign: "left",
								borderBottom: "2px solid #ddd",
								color: "black",
								cursor: "pointer",
							}}
							onClick={() => sortData("contractor")}
						>
							Contractor{" "}
							{sortConfig.key === "contractor" &&
								(sortConfig.direction === "asc" ? "↑" : "↓")}
						</th>
						<th
							style={{
								padding: "12px",
								textAlign: "left",
								borderBottom: "2px solid #ddd",
								color: "black",
								cursor: "pointer",
							}}
							onClick={() => sortData("fiberCircuit")}
						>
							Fiber Circuit Provider{" "}
							{sortConfig.key === "fiberCircuit" &&
								(sortConfig.direction === "asc" ? "↑" : "↓")}
						</th>
						<th
							style={{
								padding: "12px",
								textAlign: "right",
								borderBottom: "2px solid #ddd",
								color: "black",
								cursor: "pointer",
							}}
							onClick={() => sortData("percentageComplete")}
						>
							% Complete{" "}
							{sortConfig.key === "percentageComplete" &&
								(sortConfig.direction === "asc" ? "↑" : "↓")}
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
							<td style={{ padding: "12px" }}>
								{project.fiberCircuit?.providerName}
							</td>
							<td style={{ padding: "12px", textAlign: "right" }}>
								{project.percentageComplete?.toFixed(2)}%
							</td>
							<td style={{ padding: "12px", textAlign: "center" }}>
								<FaEdit
									style={{ cursor: "pointer", marginRight: "10px" }}
									onClick={() => handleEdit(project)}
								/>
								<FaTrash
									style={{ cursor: "pointer" }}
									onClick={() => handleDelete(project.id)}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Projects;
