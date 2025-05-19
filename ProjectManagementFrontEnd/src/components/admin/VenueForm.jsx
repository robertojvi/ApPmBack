import React, { useState } from "react";

function VenueForm({ onClose, onVenueCreated }) {
	const [formData, setFormData] = useState({
		name: "",
		address: "",
		city: "",
		state: "",
		zipCode: "",
		country: "",
		phoneNumber: "",
		email: "",
		contactPerson: "",
		numberOfLots: "",
		electricalCompany: "",
		buldings: [],
		serviceAreas: [],
		contractSLA: "",
	});
	const [error, setError] = useState("");

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		if (name === "buldings" || name === "serviceAreas") {
			setFormData({
				...formData,
				[name]: value.split(",").map((item) => item.trim()),
			});
		} else {
			setFormData({
				...formData,
				[name]: value,
			});
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		try {
			const payload = {
				...formData,
				numberOfLots: Number(formData.numberOfLots),
				buldings: Array.isArray(formData.buldings)
					? formData.buldings.filter((b) => b)
					: [],
				serviceAreas: Array.isArray(formData.serviceAreas)
					? formData.serviceAreas.filter((s) => s)
					: [],
			};
			let response;
			try {
				// Try relative path first (if you have a proxy set up in package.json)
				response = await fetch("/api/venues", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
				});
			} catch (networkError) {
				// If relative fails, try absolute URL
				try {
					response = await fetch("http://localhost:8080/api/venues", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(payload),
					});
				} catch (networkError2) {
					setError(
						"Network error: Could not reach backend. Is it running and is CORS enabled?"
					);
					return;
				}
			}
			let data = null;
			try {
				data = await response.json();
			} catch {
				// If backend returns no JSON, ignore
			}
			if (!response.ok) {
				let msg = "Failed to create venue";
				if (data && data.message) msg = data.message;
				setError(msg + (response.status ? ` (HTTP ${response.status})` : ""));
				console.error("Venue creation failed:", response.status, data);
				return;
			}
			onVenueCreated();
			onClose();
		} catch (err) {
			setError(err.message || "Failed to create venue");
			console.error("Unexpected error:", err);
		}
	};

	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor: "rgba(0,0,0,0.5)",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				zIndex: 1000,
			}}
		>
			<div
				style={{
					backgroundColor: "white",
					padding: "20px",
					borderRadius: "8px",
					width: "80%",
					maxWidth: "600px",
					maxHeight: "80vh",
					overflowY: "auto",
				}}
			>
				<h3>Create New Venue</h3>
				{error && (
					<div
						style={{
							color: "red",
							marginBottom: "10px",
							padding: "10px",
							backgroundColor: "#ffebee",
						}}
					>
						{error}
					</div>
				)}
				<form onSubmit={handleSubmit}>
					<div style={{ marginBottom: "10px" }}>
						<label>Name: </label>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div style={{ marginBottom: "10px" }}>
						<label>Address: </label>
						<input
							type="text"
							name="address"
							value={formData.address}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div style={{ marginBottom: "10px" }}>
						<label>City: </label>
						<input
							type="text"
							name="city"
							value={formData.city}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div style={{ marginBottom: "10px" }}>
						<label>State: </label>
						<input
							type="text"
							name="state"
							value={formData.state}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div style={{ marginBottom: "10px" }}>
						<label>Zip Code: </label>
						<input
							type="text"
							name="zipCode"
							value={formData.zipCode}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div style={{ marginBottom: "10px" }}>
						<label>Country: </label>
						<input
							type="text"
							name="country"
							value={formData.country}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div style={{ marginBottom: "10px" }}>
						<label>Phone Number: </label>
						<input
							type="text"
							name="phoneNumber"
							value={formData.phoneNumber}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div style={{ marginBottom: "10px" }}>
						<label>Email: </label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div style={{ marginBottom: "10px" }}>
						<label>Contact Person: </label>
						<input
							type="text"
							name="contactPerson"
							value={formData.contactPerson}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div style={{ marginBottom: "10px" }}>
						<label>Number of Lots: </label>
						<input
							type="number"
							name="numberOfLots"
							value={formData.numberOfLots}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div style={{ marginBottom: "10px" }}>
						<label>Electrical Company: </label>
						<input
							type="text"
							name="electricalCompany"
							value={formData.electricalCompany}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div style={{ marginBottom: "10px" }}>
						<label>Buildings (comma-separated): </label>
						<input
							type="text"
							name="buldings"
							value={formData.buldings.join(", ")}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div style={{ marginBottom: "10px" }}>
						<label>Service Areas (comma-separated): </label>
						<input
							type="text"
							name="serviceAreas"
							value={formData.serviceAreas.join(", ")}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div style={{ marginBottom: "10px" }}>
						<label>Contract SLA: </label>
						<input
							type="text"
							name="contractSLA"
							value={formData.contractSLA}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div
						style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}
					>
						<button type="button" onClick={onClose}>
							Cancel
						</button>
						<button type="submit">Create Venue</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default VenueForm;
