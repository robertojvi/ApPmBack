import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import VenueForm from "./VenueForm";

function Venues() {
	const [venues, setVenues] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showForm, setShowForm] = useState(false);
	const [selectedVenue, setSelectedVenue] = useState(null);
	const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

	useEffect(() => {
		const fetchVenues = async () => {
			try {
				const response = await fetch("/api/venues/list");
				if (!response.ok)
					throw new Error(`HTTP error! status: ${response.status}`);
				const data = await response.json();
				setVenues(data);
			} catch (error) {
				console.error("Error fetching venues:", error);
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchVenues();
	}, []);

	const refreshVenues = () => {
		setLoading(true);
		setError(null);
		fetch("/api/venues/list")
			.then((res) => {
				if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
				return res.json();
			})
			.then((data) => setVenues(data))
			.catch((error) => setError(error.message))
			.finally(() => setLoading(false));
	};

	const handleEdit = (venue) => {
		setSelectedVenue(venue);
		setShowForm(true);
	};

	const handleCloseForm = () => {
		setShowForm(false);
		setSelectedVenue(null);
	};

	const handleDelete = async (venueId) => {
		if (!window.confirm("Are you sure you want to delete this venue?")) {
			return;
		}

		try {
			let response;
			try {
				response = await fetch(`/api/venues/${venueId}`, {
					method: "DELETE",
				});
			} catch (networkError) {
				response = await fetch(`http://localhost:8080/api/venues/${venueId}`, {
					method: "DELETE",
				});
			}

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			refreshVenues();
		} catch (error) {
			console.error("Error deleting venue:", error);
			setError("Failed to delete venue. Please try again.");
		}
	};

	const sortData = (key) => {
		let direction = "asc";
		if (sortConfig.key === key && sortConfig.direction === "asc") {
			direction = "desc";
		}
		setSortConfig({ key, direction });

		const sortedData = [...venues].sort((a, b) => {
			if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
			if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
			return 0;
		});
		setVenues(sortedData);
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
				Venues
			</h2>
			<button onClick={() => setShowForm(true)} className="action-button">
				Create New Venue
			</button>
			{showForm && (
				<VenueForm
					onClose={handleCloseForm}
					onVenueCreated={() => {
						handleCloseForm();
						refreshVenues();
					}}
					initialData={selectedVenue}
					isEditing={!!selectedVenue}
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
								textAlign: "right",
								borderBottom: "2px solid #ddd",
								cursor: "pointer",
							}}
							onClick={() => sortData("numberOfLots")}
						>
							Number of Lots{" "}
							{sortConfig.key === "numberOfLots" &&
								(sortConfig.direction === "asc" ? "↑" : "↓")}
						</th>
						<th
							style={{
								padding: "12px",
								textAlign: "left",
								borderBottom: "2px solid #ddd",
								cursor: "pointer",
							}}
							onClick={() => sortData("contactPerson")}
						>
							Contact Person{" "}
							{sortConfig.key === "contactPerson" &&
								(sortConfig.direction === "asc" ? "↑" : "↓")}
						</th>
						<th
							style={{
								padding: "12px",
								textAlign: "left",
								borderBottom: "2px solid #ddd",
								cursor: "pointer",
							}}
							onClick={() => sortData("email")}
						>
							Email{" "}
							{sortConfig.key === "email" &&
								(sortConfig.direction === "asc" ? "↑" : "↓")}
						</th>
						<th
							style={{
								padding: "12px",
								textAlign: "left",
								borderBottom: "2px solid #ddd",
								cursor: "pointer",
							}}
							onClick={() => sortData("phoneNumber")}
						>
							Phone Number{" "}
							{sortConfig.key === "phoneNumber" &&
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
					{venues.map((venue) => (
						<tr key={venue.id} style={{ borderBottom: "1px solid #ddd" }}>
							<td style={{ padding: "12px" }}>{venue.name}</td>
							<td style={{ padding: "12px" }}>{venue.city}</td>
							<td style={{ padding: "12px" }}>{venue.state}</td>
							<td style={{ padding: "12px", textAlign: "right" }}>
								{venue.numberOfLots || 0}
							</td>
							<td style={{ padding: "12px" }}>{venue.contactPerson || "-"}</td>
							<td style={{ padding: "12px" }}>{venue.email || "-"}</td>
							<td style={{ padding: "12px" }}>{venue.phoneNumber || "-"}</td>
							<td style={{ padding: "12px", textAlign: "center" }}>
								<FaEdit
									style={{ cursor: "pointer", marginRight: "10px" }}
									onClick={() => handleEdit(venue)}
								/>
								<FaTrash
									style={{ cursor: "pointer" }}
									onClick={() => handleDelete(venue.id)}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Venues;
