import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import ImpEngineerForm from "./ImpEngineerForm";

function ImplementationEngineers() {
	const [impEngineers, setImpEngineers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showForm, setShowForm] = useState(false);
	const [selectedEngineer, setSelectedEngineer] = useState(null);
	const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

	const fetchEngineers = async () => {
		setLoading(true);
		setError(null);
		try {
			let response = await fetch("/api/impEngineers/list");
			if (!response.ok) {
				try {
					response = await fetch("http://localhost:8080/api/impEngineers/list");
					if (!response.ok)
						throw new Error(`HTTP error! status: ${response.status}`);
				} catch (networkError) {
					throw new Error("Could not reach backend server");
				}
			}
			const data = await response.json();
			setImpEngineers(data);
		} catch (error) {
			console.error("Error fetching engineers:", error);
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchEngineers();
	}, []);

	const handleEdit = (engineer) => {
		setSelectedEngineer(engineer);
		setShowForm(true);
	};

	const handleCloseForm = () => {
		setShowForm(false);
		setSelectedEngineer(null);
	};

	const handleDelete = async (engineerId) => {
		if (
			!window.confirm(
				"Are you sure you want to delete this implementation engineer?"
			)
		) {
			return;
		}

		try {
			let response;
			try {
				response = await fetch(`/api/impEngineers/${engineerId}`, {
					method: "DELETE",
				});
			} catch (networkError) {
				response = await fetch(
					`http://localhost:8080/api/impEngineers/${engineerId}`,
					{
						method: "DELETE",
					}
				);
			}

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			fetchEngineers();
		} catch (error) {
			console.error("Error deleting implementation engineer:", error);
			setError("Failed to delete implementation engineer. Please try again.");
		}
	};

	const sortData = (key) => {
		let direction = "asc";
		if (sortConfig.key === key && sortConfig.direction === "asc") {
			direction = "desc";
		}
		setSortConfig({ key, direction });

		const sortedData = [...impEngineers].sort((a, b) => {
			if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
			if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
			return 0;
		});
		setImpEngineers(sortedData);
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
				Implementation Engineers
			</h2>
			<button
				onClick={() => {
					setShowForm(true);
					setSelectedEngineer(null);
				}}
				className="action-button"
			>
				Create New Implementation Engineer
			</button>

			{showForm && (
				<ImpEngineerForm
					onClose={handleCloseForm}
					onEngineerCreated={() => {
						handleCloseForm();
						fetchEngineers();
					}}
					initialData={selectedEngineer}
					isEditing={!!selectedEngineer}
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
					{impEngineers.map((engineer) => (
						<tr key={engineer.id} style={{ borderBottom: "1px solid #ddd" }}>
							<td style={{ padding: "12px" }}>{engineer.name}</td>
							<td style={{ padding: "12px" }}>{engineer.city}</td>
							<td style={{ padding: "12px" }}>{engineer.state}</td>
							<td style={{ padding: "12px", textAlign: "center" }}>
								<FaEdit
									style={{ cursor: "pointer", marginRight: "10px" }}
									onClick={() => handleEdit(engineer)}
								/>
								<FaTrash
									style={{ cursor: "pointer" }}
									onClick={() => handleDelete(engineer.id)}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default ImplementationEngineers;
