import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

function Forms() {
	const [foms, setFoms] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchFoms = async () => {
			try {
				const response = await fetch("/api/foms/list");
				if (!response.ok)
					throw new Error(`HTTP error! status: ${response.status}`);
				const data = await response.json();
				setFoms(data);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchFoms();
	}, []);

	if (loading) return <div style={{ color: "black" }}>Loading...</div>;
	if (error) return <div style={{ color: "black" }}>Error: {error}</div>;

	return (
		<div style={{ color: "black" }}>
			<h2>Field Operations Managers List</h2>
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
							Email
						</th>
						<th
							style={{
								padding: "12px",
								textAlign: "left",
								borderBottom: "2px solid #ddd",
							}}
						>
							Phone
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
							<td style={{ padding: "12px" }}>{fom.email}</td>
							<td style={{ padding: "12px" }}>{fom.phoneNumber}</td>
							<td style={{ padding: "12px", textAlign: "center" }}>
								<FaEdit style={{ cursor: "pointer", marginRight: "10px" }} />
								<FaTrash style={{ cursor: "pointer", marginRight: "10px" }} />
								<FaPlus style={{ cursor: "pointer" }} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Forms;
