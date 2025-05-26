import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import ProjectManagerForm from "./ProjectManagerForm";

function ProjectManagers() {
	const [projectManagers, setProjectManagers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showForm, setShowForm] = useState(false);
	const [selectedProjectManager, setSelectedProjectManager] = useState(null);
	const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

	const fetchProjectManagers = async () => {
		setLoading(true);
		setError(null);
		try {
			let response = await fetch("/api/projectManagers/list");
			if (!response.ok) {
				try {
					response = await fetch(
						"http://localhost:8080/api/projectManagers/list"
					);
					if (!response.ok)
						throw new Error(`HTTP error! status: ${response.status}`);
				} catch (networkError) {
					throw new Error("Could not reach backend server");
				}
			}
			const data = await response.json();
			setProjectManagers(data); // Fixed: was setProjectManager
		} catch (error) {
			console.error("Error fetching project managers:", error);
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProjectManagers();
	}, []);

	const handleEdit = (projectManager) => {
		setSelectedProjectManager(projectManager);
		setShowForm(true);
	};

	const handleCloseForm = () => {
		setShowForm(false);
		setSelectedProjectManager(null); // Fixed: was setSelectedContractor
	};

	const handleDelete = async (managerId) => {
		if (
			!window.confirm("Are you sure you want to delete this project manager?")
		) {
			return;
		}

		try {
			let response;
			try {
				response = await fetch(`/api/projectManagers/${managerId}`, {
					method: "DELETE",
				});
			} catch (networkError) {
				response = await fetch(
					`http://localhost:8080/api/projectManagers/${managerId}`,
					{
						method: "DELETE",
					}
				);
			}

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			fetchProjectManagers();
		} catch (error) {
			console.error("Error deleting project manager:", error);
			setError("Failed to delete project manager. Please try again.");
		}
	};

	const sortData = (key) => {
		let direction = "asc";
		if (sortConfig.key === key && sortConfig.direction === "asc") {
			direction = "desc";
		}
		setSortConfig({ key, direction });

		const sortedData = [...projectManagers].sort((a, b) => {
			if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
			if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
			return 0;
		});
		setProjectManagers(sortedData);
	};

	if (loading) return <div style={{ color: "black" }}>Loading...</div>;
	if (error) return <div style={{ color: "black" }}>Error: {error}</div>;

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
				Project Managers
			</h2>
			<button
				onClick={() => {
					setShowForm(true);
					setSelectedProjectManager(null);
				}}
				className="action-button"
			>
				Create New Project Manager
			</button>

			{showForm && (
				<ProjectManagerForm
					onClose={handleCloseForm}
					onProjectManagerCreated={() => {
						handleCloseForm();
						fetchProjectManagers(); // Fixed: was fetchContractors
					}}
					initialData={selectedProjectManager}
					isEditing={!!selectedProjectManager}
				/>
			)}

			<table
				style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}
			>
				<thead>
					<tr style={{ backgroundColor: "#f4f4f4" }}>
						<th
							style={{
								padding: "12px",
								textAlign: "left",
								borderBottom: "2px solid #ddd",
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
								cursor: "pointer",
							}}
							onClick={() => sortData("city")}
						>
							City{" "}
							{sortConfig.key === "city" &&
								(sortConfig.direction === "asc" ? "↑" : "↓")}
						</th>
						<th
							style={{
								padding: "12px",
								textAlign: "left",
								borderBottom: "2px solid #ddd",
								cursor: "pointer",
							}}
							onClick={() => sortData("state")}
						>
							State{" "}
							{sortConfig.key === "state" &&
								(sortConfig.direction === "asc" ? "↑" : "↓")}
						</th>
						<th
							style={{
								padding: "12px",
								textAlign: "center",
								borderBottom: "2px solid #ddd",
							}}
						>
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{projectManagers.map(
						(
							pm // Fixed: was contractors
						) => (
							<tr key={pm.id} style={{ borderBottom: "1px solid #ddd" }}>
								<td style={{ padding: "12px" }}>{pm.name}</td>
								<td style={{ padding: "12px" }}>{pm.city}</td>
								<td style={{ padding: "12px" }}>{pm.state}</td>
								<td style={{ padding: "12px", textAlign: "center" }}>
									<FaEdit
										style={{ cursor: "pointer", marginRight: "10px" }}
										onClick={() => handleEdit(pm)}
									/>
									<FaTrash
										style={{ cursor: "pointer" }}
										onClick={() => handleDelete(pm.id)}
									/>
								</td>
							</tr>
						)
					)}
				</tbody>
			</table>
		</div>
	);
}

export default ProjectManagers;
