import React, { useEffect, useState } from "react";
import FiberCircuitForm from "./FiberCircuitForm";
import { FaEdit, FaTrash } from "react-icons/fa";

function FiberCircuits() {
	const [fiberCircuits, setFiberCircuits] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showForm, setShowForm] = useState(false);

	const fetchFiberCircuits = async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetch("/api/fiberCircuits/list");
			if (!response.ok)
				throw new Error(`HTTP error! status: ${response.status}`);
			const data = await response.json();
			setFiberCircuits(data);
		} catch (error) {
			console.error("Error fetching Fiber Circuits:", error);
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchFiberCircuits();
	}, []);

	const refreshFiberCircuits = () => {
		fetchFiberCircuits();
	};

	if (loading) return <div style={{ color: "black" }}>Loading...</div>;
	if (error) return <div style={{ color: "black" }}>Error: {error}</div>;

	return (
		<div style={{ color: "black" }}>
			<h2>Fiber Circuits List</h2>
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
				Create New Fiber Circuit
			</button>
			{showForm && (
				<FiberCircuitForm
					onClose={() => setShowForm(false)}
					onFiberCircuitCreated={refreshFiberCircuits}
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
							Provider Name
						</th>
						<th
							style={{
								padding: "12px",
								textAlign: "left",
								borderBottom: "2px solid #ddd",
							}}
						>
							Circuit ID
						</th>
						<th
							style={{
								padding: "12px",
								textAlign: "left",
								borderBottom: "2px solid #ddd",
							}}
						>
							Status
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
					{fiberCircuits.map((circuit) => (
						<tr key={circuit.id} style={{ borderBottom: "1px solid #ddd" }}>
							<td style={{ padding: "12px" }}>{circuit.providerName}</td>
							<td style={{ padding: "12px" }}>{circuit.circuitId}</td>
							<td style={{ padding: "12px" }}>{circuit.circuitStatus}</td>
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

export default FiberCircuits;
