import React, { useState, useEffect } from "react";

function VenueForm({ onClose, onVenueCreated, initialData, isEditing }) {
	const [formData, setFormData] = useState({
		id: "",
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

	useEffect(() => {
		if (initialData) {
			setFormData(initialData);
		}
	}, [initialData]);

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
			// Ensure correct data types and format
			const payload = {
				...(isEditing ? { id: initialData.id } : {}), // Include id only when editing
				name: formData.name,
				address: formData.address,
				city: formData.city,
				state: formData.state,
				zipCode: formData.zipCode,
				country: formData.country,
				phoneNumber: formData.phoneNumber,
				email: formData.email,
				contactPerson: formData.contactPerson,
				numberOfLots: parseInt(formData.numberOfLots),
				electricalCompany: formData.electricalCompany,
				buldings: Array.isArray(formData.buldings)
					? formData.buldings
					: formData.buldings.split(",").map((b) => b.trim()),
				serviceAreas: Array.isArray(formData.serviceAreas)
					? formData.serviceAreas
					: formData.serviceAreas.split(",").map((s) => s.trim()),
				contractSLA: formData.contractSLA,
			};

			console.log("Sending payload:", payload); // Debug log

			const response = await fetch("/api/venues", {
				method: isEditing ? "PUT" : "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Failed to save venue");
			}

			onVenueCreated();
			onClose();
		} catch (err) {
			console.error("Error details:", err);
			setError(err.message || "Failed to save venue");
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
					padding: "32px 24px",
					borderRadius: "12px",
					width: "90%",
					maxWidth: "600px",
					boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
					color: "black",
				}}
			>
				<h3
					style={{
						marginBottom: "1.5rem",
						color: "#333",
					}}
				>
					{isEditing ? "Edit Venue" : "Create New Venue"}
				</h3>
				{error && (
					<div
						style={{
							color: "#721c24",
							backgroundColor: "#f8d7da",
							border: "1px solid #f5c6cb",
							borderRadius: "4px",
							marginBottom: "16px",
							padding: "12px",
						}}
					>
						{error}
					</div>
				)}
				<form onSubmit={handleSubmit}>
					{/* Each row is a flex container: label 50%, input 50% */}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginBottom: "16px",
						}}
					>
						<label
							style={{
								width: "50%",
								marginRight: "8px",
							}}
						>
							Name:
						</label>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleInputChange}
							required
							style={{
								width: "50%",
								padding: "8px",
								border: "1px solid #ddd",
								borderRadius: "4px",
							}}
						/>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginBottom: "16px",
						}}
					>
						<label
							style={{
								width: "50%",
								marginRight: "8px",
							}}
						>
							Address:
						</label>
						<input
							type="text"
							name="address"
							value={formData.address}
							onChange={handleInputChange}
							required
							style={{
								width: "50%",
								padding: "8px",
								border: "1px solid #ddd",
								borderRadius: "4px",
							}}
						/>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginBottom: "16px",
						}}
					>
						<label
							style={{
								width: "50%",
								marginRight: "8px",
							}}
						>
							City:
						</label>
						<input
							type="text"
							name="city"
							value={formData.city}
							onChange={handleInputChange}
							required
							style={{
								width: "50%",
								padding: "8px",
								border: "1px solid #ddd",
								borderRadius: "4px",
							}}
						/>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginBottom: "16px",
						}}
					>
						<label
							style={{
								width: "50%",
								marginRight: "8px",
							}}
						>
							State:
						</label>
						<input
							type="text"
							name="state"
							value={formData.state}
							onChange={handleInputChange}
							required
							style={{
								width: "50%",
								padding: "8px",
								border: "1px solid #ddd",
								borderRadius: "4px",
							}}
						/>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginBottom: "16px",
						}}
					>
						<label
							style={{
								width: "50%",
								marginRight: "8px",
							}}
						>
							Zip Code:
						</label>
						<input
							type="text"
							name="zipCode"
							value={formData.zipCode}
							onChange={handleInputChange}
							required
							style={{
								width: "50%",
								padding: "8px",
								border: "1px solid #ddd",
								borderRadius: "4px",
							}}
						/>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginBottom: "16px",
						}}
					>
						<label
							style={{
								width: "50%",
								marginRight: "8px",
							}}
						>
							Country:
						</label>
						<input
							type="text"
							name="country"
							value={formData.country}
							onChange={handleInputChange}
							required
							style={{
								width: "50%",
								padding: "8px",
								border: "1px solid #ddd",
								borderRadius: "4px",
							}}
						/>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginBottom: "16px",
						}}
					>
						<label
							style={{
								width: "50%",
								marginRight: "8px",
							}}
						>
							Phone Number:
						</label>
						<input
							type="text"
							name="phoneNumber"
							value={formData.phoneNumber}
							onChange={handleInputChange}
							required
							style={{
								width: "50%",
								padding: "8px",
								border: "1px solid #ddd",
								borderRadius: "4px",
							}}
						/>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginBottom: "16px",
						}}
					>
						<label
							style={{
								width: "50%",
								marginRight: "8px",
							}}
						>
							Email:
						</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleInputChange}
							required
							style={{
								width: "50%",
								padding: "8px",
								border: "1px solid #ddd",
								borderRadius: "4px",
							}}
						/>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginBottom: "16px",
						}}
					>
						<label
							style={{
								width: "50%",
								marginRight: "8px",
							}}
						>
							Contact Person:
						</label>
						<input
							type="text"
							name="contactPerson"
							value={formData.contactPerson}
							onChange={handleInputChange}
							required
							style={{
								width: "50%",
								padding: "8px",
								border: "1px solid #ddd",
								borderRadius: "4px",
							}}
						/>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginBottom: "16px",
						}}
					>
						<label
							style={{
								width: "50%",
								marginRight: "8px",
							}}
						>
							Number of Lots:
						</label>
						<input
							type="number"
							name="numberOfLots"
							value={formData.numberOfLots}
							onChange={handleInputChange}
							required
							style={{
								width: "50%",
								padding: "8px",
								border: "1px solid #ddd",
								borderRadius: "4px",
							}}
						/>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginBottom: "16px",
						}}
					>
						<label
							style={{
								width: "50%",
								marginRight: "8px",
							}}
						>
							Electrical Company:
						</label>
						<input
							type="text"
							name="electricalCompany"
							value={formData.electricalCompany}
							onChange={handleInputChange}
							required
							style={{
								width: "50%",
								padding: "8px",
								border: "1px solid #ddd",
								borderRadius: "4px",
							}}
						/>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginBottom: "16px",
						}}
					>
						<label
							style={{
								width: "50%",
								marginRight: "8px",
							}}
						>
							Buildings (comma-separated):
						</label>
						<input
							type="text"
							name="buldings"
							value={formData.buldings.join(", ")}
							onChange={handleInputChange}
							required
							style={{
								width: "50%",
								padding: "8px",
								border: "1px solid #ddd",
								borderRadius: "4px",
							}}
						/>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginBottom: "16px",
						}}
					>
						<label
							style={{
								width: "50%",
								marginRight: "8px",
							}}
						>
							Service Areas (comma-separated):
						</label>
						<input
							type="text"
							name="serviceAreas"
							value={formData.serviceAreas.join(", ")}
							onChange={handleInputChange}
							required
							style={{
								width: "50%",
								padding: "8px",
								border: "1px solid #ddd",
								borderRadius: "4px",
							}}
						/>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginBottom: "16px",
						}}
					>
						<label
							style={{
								width: "50%",
								marginRight: "8px",
							}}
						>
							Contract SLA:
						</label>
						<input
							type="text"
							name="contractSLA"
							value={formData.contractSLA}
							onChange={handleInputChange}
							required
							style={{
								width: "50%",
								padding: "8px",
								border: "1px solid #ddd",
								borderRadius: "4px",
							}}
						/>
					</div>
					<div
						style={{
							display: "flex",
							gap: "10px",
							justifyContent: "flex-end",
						}}
					>
						<button
							type="button"
							onClick={onClose}
							style={{
								padding: "8px 16px",
								backgroundColor: "#ccc",
								color: "#333",
								border: "none",
								borderRadius: "4px",
								cursor: "pointer",
							}}
						>
							Cancel
						</button>
						<button
							type="submit"
							style={{
								padding: "8px 16px",
								backgroundColor: "#4CAF50",
								color: "white",
								border: "none",
								borderRadius: "4px",
								cursor: "pointer",
							}}
						>
							{isEditing ? "Save Changes" : "Create Venue"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default VenueForm;
