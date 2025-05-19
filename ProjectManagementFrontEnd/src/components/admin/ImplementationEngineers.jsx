import React, { useEffect, useState } from "react";
import ImpEngineerForm from "./ImpEngineerForm";
import { FaEdit, FaTrash } from "react-icons/fa";

function ImplementationEngineers() {
	const [impEngineers, setImpEngineers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showForm, setShowForm] = useState(false);

	const fetchImpEngineers = async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetch("/api/impEngineers/list");
			if (!response.ok)
				throw new Error(`HTTP error! status: ${response.status}`);
			const data = await response.json();
			setImpEngineers(data);
		} catch (error) {
			console.error("Error fetching Implementation Engineers:", error);
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchImpEngineers();
	}, []);

	const refreshImpEngineers = () => {
		fetchImpEngineers();
	};

	if (loading) return <div style={{ color: "black" }}>Loading...</div>;
	if (error) return <div style={{ color: "black" }}>Error: {error}</div>;

	return (
		<div style={{ color: "black" }}>
			<h2>Implementation Engineers List</h2>
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
				Create New Implementation Engineer
			</button>
			{showForm && (
				<ImpEngineerForm
					onClose={() => setShowForm(false)}
					onImpEngineerCreated={refreshImpEngineers}
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
					{impEngineers.map((eng) => (
						<tr key={eng.id} style={{ borderBottom: "1px solid #ddd" }}>
							<td style={{ padding: "12px" }}>{eng.name}</td>
							<td style={{ padding: "12px" }}>{eng.city}</td>
							<td style={{ padding: "12px" }}>{eng.state}</td>
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

export default ImplementationEngineers;
