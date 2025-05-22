import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import VenueForm from "./VenueForm";

function Venues() {
	const [venues, setVenues] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showForm, setShowForm] = useState(false);
	const [selectedVenue, setSelectedVenue] = useState(null);

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
								textAlign: "right",
								borderBottom: "2px solid #ddd",
							}}
						>
							Number of Lots
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
