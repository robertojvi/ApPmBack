import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import ImpEngineerForm from "./ImpEngineerForm";

function ImplementationEngineers() {
	const [impEngineers, setImpEngineers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showForm, setShowForm] = useState(false);
	const [selectedEngineer, setSelectedEngineer] = useState(null);

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

	if (loading) return <div style={{ color: "black" }}>Loading...</div>;
	if (error) return <div style={{ color: "black" }}>Error: {error}</div>;

	return (
		<div style={{ color: "black" }}>
			<h2>Implementation Engineers List</h2>
			<button
				onClick={() => {
					setShowForm(true);
					setSelectedEngineer(null);
				}}
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
								<FaTrash style={{ cursor: "pointer" }} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default ImplementationEngineers;
