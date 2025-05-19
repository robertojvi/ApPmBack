import React, { useEffect, useState } from "react";
import ProjectManagerForm from "./ProjectManagerForm";
import { FaEdit, FaTrash } from "react-icons/fa";

function ProjectManagers() {
	const [projectManagers, setProjectManagers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showForm, setShowForm] = useState(false);

	const fetchProjectManagers = async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetch("/api/projectManagers/list");
			if (!response.ok)
				throw new Error(`HTTP error! status: ${response.status}`);
			const data = await response.json();
			setProjectManagers(data);
		} catch (error) {
			console.error("Error fetching Project Managers:", error);
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProjectManagers();
	}, []);

	const refreshProjectManagers = () => {
		fetchProjectManagers();
	};

	if (loading) return <div style={{ color: "black" }}>Loading...</div>;
	if (error) return <div style={{ color: "black" }}>Error: {error}</div>;

	return (
		<div style={{ color: "black" }}>
			<h2>Project Managers List</h2>
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
				Create New Project Manager
			</button>
			{showForm && (
				<ProjectManagerForm
					onClose={() => setShowForm(false)}
					onProjectManagerCreated={refreshProjectManagers}
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
							}}
						>
							Name
						</th>
						<th
							style={{
								padding: "12px",
								textAlign: "left",
								borderBottom: "2px solid #ddd",
							}}
						>
							City
						</th>
						<th
							style={{
								padding: "12px",
								textAlign: "left",
								borderBottom: "2px solid #ddd",
							}}
						>
							State
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
					{projectManagers.map((pm) => (
						<tr key={pm.id} style={{ borderBottom: "1px solid #ddd" }}>
							<td style={{ padding: "12px" }}>{pm.name}</td>
							<td style={{ padding: "12px" }}>{pm.city}</td>
							<td style={{ padding: "12px" }}>{pm.state}</td>
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

export default ProjectManagers;
