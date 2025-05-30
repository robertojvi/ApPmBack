import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import FiberCircuitForm from "./FiberCircuitForm";

function FiberCircuits() {
	const [circuits, setCircuits] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showForm, setShowForm] = useState(false);
	const [selectedCircuit, setSelectedCircuit] = useState(null);
	const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

	const fetchCircuits = async () => {
		setLoading(true);
		setError(null);
		try {
			let response = await fetch("/api/fiberCircuits/list");
			if (!response.ok) {
				try {
					response = await fetch(
						"http://localhost:8080/api/fiberCircuits/list"
					);
					if (!response.ok)
						throw new Error(`HTTP error! status: ${response.status}`);
				} catch (networkError) {
					throw new Error("Could not reach backend server");
				}
			}
			const data = await response.json();
			setCircuits(data);
		} catch (error) {
			console.error("Error fetching circuits:", error);
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchCircuits();
	}, []);

	const handleEdit = (circuit) => {
		setSelectedCircuit(circuit);
		setShowForm(true);
	};

	const handleCloseForm = () => {
		setShowForm(false);
		setSelectedCircuit(null);
	};

	const handleDelete = async (circuitId) => {
		if (
			!window.confirm("Are you sure you want to delete this fiber circuit?")
		) {
			return;
		}

		try {
			let response;
			try {
				response = await fetch(`/api/fiberCircuits/${circuitId}`, {
					method: "DELETE",
				});
			} catch (networkError) {
				response = await fetch(
					`http://localhost:8080/api/fiberCircuits/${circuitId}`,
					{
						method: "DELETE",
					}
				);
			}

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			fetchCircuits();
		} catch (error) {
			console.error("Error deleting fiber circuit:", error);
			setError("Failed to delete fiber circuit. Please try again.");
		}
	};

	const sortData = (key) => {
		let direction = "asc";
		if (sortConfig.key === key && sortConfig.direction === "asc") {
			direction = "desc";
		}
		setSortConfig({ key, direction });

		const sortedData = [...circuits].sort((a, b) => {
			if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
			if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
			return 0;
		});
		setCircuits(sortedData);
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
				Fiber Circuits
			</h2>
			<button
				onClick={() => {
					setShowForm(true);
					setSelectedCircuit(null);
				}}
				className="action-button"
			>
				Create New Fiber Circuit
			</button>

			{showForm && (
				<FiberCircuitForm
					onClose={handleCloseForm}
					onCircuitCreated={() => {
						handleCloseForm();
						fetchCircuits();
					}}
					initialData={selectedCircuit}
					isEditing={!!selectedCircuit}
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
							onClick={() => sortData("providerName")}
						>
							Provider Name{" "}
							{sortConfig.key === "providerName" &&
								(sortConfig.direction === "asc" ? "↑" : "↓")}
						</th>
						<th
							style={{
								padding: "12px",
								textAlign: "left",
								borderBottom: "2px solid #ddd",
								cursor: "pointer",
							}}
							onClick={() => sortData("circuitId")}
						>
							Circuit ID{" "}
							{sortConfig.key === "circuitId" &&
								(sortConfig.direction === "asc" ? "↑" : "↓")}
						</th>
						<th
							style={{
								padding: "12px",
								textAlign: "left",
								borderBottom: "2px solid #ddd",
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
								textAlign: "center",
								borderBottom: "2px solid #ddd",
							}}
						>
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{circuits.map((circuit) => (
						<tr key={circuit.id} style={{ borderBottom: "1px solid #ddd" }}>
							<td style={{ padding: "12px" }}>{circuit.providerName}</td>
							<td style={{ padding: "12px" }}>{circuit.circuitId}</td>
							<td style={{ padding: "12px" }}>{circuit.circuitStatus}</td>
							<td style={{ padding: "12px", textAlign: "center" }}>
								<FaEdit
									style={{ cursor: "pointer", marginRight: "10px" }}
									onClick={() => handleEdit(circuit)}
								/>
								<FaTrash
									style={{ cursor: "pointer" }}
									onClick={() => handleDelete(circuit.id)}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default FiberCircuits;
