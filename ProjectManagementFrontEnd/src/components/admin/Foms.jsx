import React, { useEffect, useState } from "react";
import FomForm from "./FomForm";
import { FaEdit, FaTrash } from "react-icons/fa";

function Foms() {
	const [foms, setFoms] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showForm, setShowForm] = useState(false);

	const fetchFoms = async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetch("/api/foms/list");
			if (!response.ok)
				throw new Error(`HTTP error! status: ${response.status}`);
			const data = await response.json();
			setFoms(data);
		} catch (error) {
			console.error("Error fetching FOMs:", error);
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchFoms();
	}, []);

	const refreshFoms = () => {
		fetchFoms();
	};

	if (loading) return <div style={{ color: "black" }}>Loading...</div>;
	if (error) return <div style={{ color: "black" }}>Error: {error}</div>;

	return (
		<div style={{ color: "black" }}>
			<h2>FOMs List</h2>
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
				Create New FOM
			</button>
			{showForm && (
				<FomForm
					onClose={() => setShowForm(false)}
					onFomCreated={refreshFoms}
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
					{foms.map((fom) => (
						<tr key={fom.id} style={{ borderBottom: "1px solid #ddd" }}>
							<td style={{ padding: "12px" }}>{fom.name}</td>
							<td style={{ padding: "12px" }}>{fom.city}</td>
							<td style={{ padding: "12px" }}>{fom.state}</td>
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

export default Foms;
