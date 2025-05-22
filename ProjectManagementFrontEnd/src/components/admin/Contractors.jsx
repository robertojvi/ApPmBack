import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import ContractorForm from "./ContractorForm";

function Contractors() {
	const [contractors, setContractors] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showForm, setShowForm] = useState(false);
	const [selectedContractor, setSelectedContractor] = useState(null);

	const fetchContractors = async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetch("/api/contractors/list");
			if (!response.ok)
				throw new Error(`HTTP error! status: ${response.status}`);
			const data = await response.json();
			setContractors(data);
		} catch (error) {
			console.error("Error fetching contractors:", error);
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchContractors();
	}, []);

	const refreshContractors = () => {
		fetchContractors();
	};

	const handleEdit = (contractor) => {
		setSelectedContractor(contractor);
		setShowForm(true);
	};

	const handleCloseForm = () => {
		setShowForm(false);
		setSelectedContractor(null);
	};

	const handleDelete = async (contractorId) => {
		if (!window.confirm("Are you sure you want to delete this contractor?")) {
			return;
		}

		try {
			let response;
			try {
				response = await fetch(`/api/contractors/${contractorId}`, {
					method: "DELETE",
				});
			} catch (networkError) {
				response = await fetch(
					`http://localhost:8080/api/contractors/${contractorId}`,
					{
						method: "DELETE",
					}
				);
			}

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			fetchContractors();
		} catch (error) {
			console.error("Error deleting contractor:", error);
			setError("Failed to delete contractor. Please try again.");
		}
	};

	if (loading) return <div style={{ color: "black" }}>Loading...</div>;
	if (error) return <div style={{ color: "black" }}>Error: {error}</div>;

	return (
		<div style={{ color: "black" }}>
			<h2>Contractors List</h2>
			<button
				onClick={() => {
					setShowForm(true);
					setSelectedContractor(null);
				}}
				className="action-button"
			>
				Create New Contractor
			</button>

			{showForm && (
				<ContractorForm
					onClose={handleCloseForm}
					onContractorCreated={() => {
						handleCloseForm();
						fetchContractors();
					}}
					initialData={selectedContractor}
					isEditing={!!selectedContractor}
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
					{contractors.map((contractor) => (
						<tr key={contractor.id} style={{ borderBottom: "1px solid #ddd" }}>
							<td style={{ padding: "12px" }}>{contractor.name}</td>
							<td style={{ padding: "12px" }}>{contractor.city}</td>
							<td style={{ padding: "12px" }}>{contractor.state}</td>
							<td style={{ padding: "12px", textAlign: "center" }}>
								<FaEdit
									style={{ cursor: "pointer", marginRight: "10px" }}
									onClick={() => handleEdit(contractor)}
								/>
								<FaTrash
									style={{ cursor: "pointer" }}
									onClick={() => handleDelete(contractor.id)}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Contractors;
