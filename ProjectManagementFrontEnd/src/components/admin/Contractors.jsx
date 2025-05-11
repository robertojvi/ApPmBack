import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

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
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
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
								<FaEdit style={{ cursor: "pointer", marginRight: "0.5rem" }} />
								<FaTrash style={{ cursor: "pointer" }} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<button
				style={{ marginTop: "1rem", padding: "0.5rem 1rem", cursor: "pointer" }}
			>
				<FaPlus style={{ marginRight: "0.5rem" }} /> Add Contractor
			</button>
		</div>
	);
}

export default Contractors;
