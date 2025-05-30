import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import FomForm from "./FomForm";

function Foms() {
	const [foms, setFoms] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showForm, setShowForm] = useState(false);
	const [selectedFom, setSelectedFom] = useState(null);
	const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

	const fetchFoms = async () => {
		setLoading(true);
		setError(null);
		try {
			let response = await fetch("/api/foms/list");
			if (!response.ok) {
				try {
					response = await fetch("http://localhost:8080/api/foms/list");
					if (!response.ok)
						throw new Error(`HTTP error! status: ${response.status}`);
				} catch (networkError) {
					throw new Error("Could not reach backend server");
				}
			}
			const data = await response.json();
			setFoms(data);
		} catch (error) {
			console.error("Error fetching foms:", error);
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchFoms();
	}, []);

	const handleEdit = (fom) => {
		setSelectedFom(fom);
		setShowForm(true);
	};

	const handleCloseForm = () => {
		setShowForm(false);
		setSelectedFom(null);
	};

	const handleDelete = async (fomId) => {
		if (!window.confirm("Are you sure you want to delete this FOM?")) {
			return;
		}

		try {
			let response;
			try {
				response = await fetch(`/api/foms/${fomId}`, {
					method: "DELETE",
				});
			} catch (networkError) {
				response = await fetch(`http://localhost:8080/api/foms/${fomId}`, {
					method: "DELETE",
				});
			}

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			fetchFoms();
		} catch (error) {
			console.error("Error deleting FOM:", error);
			setError("Failed to delete FOM. Please try again.");
		}
	};

	const sortData = (key) => {
		let direction = "asc";
		if (sortConfig.key === key && sortConfig.direction === "asc") {
			direction = "desc";
		}
		setSortConfig({ key, direction });

		const sortedData = [...foms].sort((a, b) => {
			if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
			if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
			return 0;
		});
		setFoms(sortedData);
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
				FOMs
			</h2>
			<button
				onClick={() => {
					setShowForm(true);
					setSelectedFom(null);
				}}
				className="action-button"
			>
				Create New FOM
			</button>

			{showForm && (
				<FomForm
					onClose={handleCloseForm}
					onFomCreated={() => {
						handleCloseForm();
						fetchFoms();
					}}
					initialData={selectedFom}
					isEditing={!!selectedFom}
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
					{foms.map((fom) => (
						<tr key={fom.id} style={{ borderBottom: "1px solid #ddd" }}>
							<td style={{ padding: "12px" }}>{fom.name}</td>
							<td style={{ padding: "12px" }}>{fom.city}</td>
							<td style={{ padding: "12px" }}>{fom.state}</td>
							<td style={{ padding: "12px", textAlign: "center" }}>
								<FaEdit
									style={{ cursor: "pointer", marginRight: "10px" }}
									onClick={() => handleEdit(fom)}
								/>
								<FaTrash
									style={{ cursor: "pointer" }}
									onClick={() => handleDelete(fom.id)}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Foms;
