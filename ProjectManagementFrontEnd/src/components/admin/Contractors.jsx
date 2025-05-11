import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function Contractors() {
	const [contractors, setContractors] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchContractors = async () => {
			setLoading(true);
			try {
				const response = await fetch("/api/contractors/list");
				if (!response.ok) {
					throw new Error("Failed to fetch contractors");
				}
				const data = await response.json();
				setContractors(data);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchContractors();
	}, []);

	if (loading) {
		return <div style={{ color: "black" }}>Loading...</div>;
	}

	if (error) {
		return <div style={{ color: "black" }}>Error: {error}</div>;
	}

	return (
		<div
			className="component-container"
			style={{
				backgroundColor: "#d3d3d3",
				padding: "1rem",
				width: "100%",
				height: "100%",
				boxSizing: "border-box",
				color: "black",
			}}
		>
			<h1 style={{ width: "100%", textAlign: "center" }}>Contractors</h1>
			<button
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
				Create New Contractor
			</button>
			<table style={{ width: "100%", borderCollapse: "collapse" }}>
				<thead>
					<tr>
						<th style={{ border: "1px solid black", padding: "0.5rem" }}>
							Name
						</th>
						<th style={{ border: "1px solid black", padding: "0.5rem" }}>
							Email
						</th>
						<th style={{ border: "1px solid black", padding: "0.5rem" }}>
							Phone
						</th>
						<th style={{ border: "1px solid black", padding: "0.5rem" }}>
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{contractors.map((contractor) => (
						<tr key={contractor.id}>
							<td style={{ border: "1px solid black", padding: "0.5rem" }}>
								{contractor.name}
							</td>
							<td style={{ border: "1px solid black", padding: "0.5rem" }}>
								{contractor.email}
							</td>
							<td style={{ border: "1px solid black", padding: "0.5rem" }}>
								{contractor.phoneNumber}
							</td>
							<td style={{ border: "1px solid black", padding: "0.5rem" }}>
								<FaEdit style={{ cursor: "pointer", marginRight: "0.5rem" }} />
								<FaTrash style={{ cursor: "pointer" }} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Contractors;
