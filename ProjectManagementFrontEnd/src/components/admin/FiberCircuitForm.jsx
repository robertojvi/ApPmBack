import React, { useState, useEffect } from "react";

function FiberCircuitForm({
	onClose,
	onCircuitCreated,
	initialData,
	isEditing,
}) {
	const [formData, setFormData] = useState({
		id: "",
		providerName: "",
		circuitId: "",
		circuitType: "",
		circuitStatus: "",
		circuitDescription: "",
		circuitBandwidth: "",
		circuitActivationDate: "",
		circuitTerminationDate: "",
		circuitLocation: "",
	});
	const [error, setError] = useState("");

	useEffect(() => {
		if (initialData) {
			setFormData({
				...initialData,
				id: initialData.id ? Number(initialData.id) : "",
			});
		}
	}, [initialData]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		try {
			let response;
			try {
				response = await fetch("/api/fiberCircuits", {
					method: isEditing ? "PUT" : "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						...formData,
						id: isEditing ? Number(formData.id) : undefined,
					}),
				});
			} catch (networkError) {
				response = await fetch("http://localhost:8080/api/fiberCircuits", {
					method: isEditing ? "PUT" : "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						...formData,
						id: isEditing ? Number(formData.id) : undefined,
					}),
				});
			}

			if (!response.ok) {
				const errorData = await response.json().catch(() => null);
				throw new Error(
					errorData?.message || `HTTP error! status: ${response.status}`
				);
			}

			onCircuitCreated();
			onClose();
		} catch (err) {
			console.error("Error saving circuit:", err);
			setError("Failed to save fiber circuit. Please try again.");
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
				<h3 style={{ marginBottom: "1.5rem", color: "#333" }}>
					{isEditing ? "Edit Fiber Circuit" : "Create New Fiber Circuit"}
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
					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginBottom: "16px",
						}}
					>
						<label style={{ width: "50%", marginRight: "8px" }}>
							Provider Name:
						</label>
						<input
							type="text"
							name="providerName"
							value={formData.providerName}
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
						<label style={{ width: "50%", marginRight: "8px" }}>
							Circuit ID:
						</label>
						<input
							type="text"
							name="circuitId"
							value={formData.circuitId}
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
						<label style={{ width: "50%", marginRight: "8px" }}>
							Circuit Type:
						</label>
						<input
							type="text"
							name="circuitType"
							value={formData.circuitType}
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
						<label style={{ width: "50%", marginRight: "8px" }}>
							Circuit Status:
						</label>
						<input
							type="text"
							name="circuitStatus"
							value={formData.circuitStatus}
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
						<label style={{ width: "50%", marginRight: "8px" }}>
							Circuit Description:
						</label>
						<input
							type="text"
							name="circuitDescription"
							value={formData.circuitDescription}
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
						<label style={{ width: "50%", marginRight: "8px" }}>
							Circuit Bandwidth:
						</label>
						<input
							type="text"
							name="circuitBandwidth"
							value={formData.circuitBandwidth}
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
						<label style={{ width: "50%", marginRight: "8px" }}>
							Activation Date:
						</label>
						<input
							type="text"
							name="circuitActivationDate"
							value={formData.circuitActivationDate}
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
						<label style={{ width: "50%", marginRight: "8px" }}>
							Termination Date:
						</label>
						<input
							type="text"
							name="circuitTerminationDate"
							value={formData.circuitTerminationDate}
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
						<label style={{ width: "50%", marginRight: "8px" }}>
							Location:
						</label>
						<input
							type="text"
							name="circuitLocation"
							value={formData.circuitLocation}
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
						style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}
					>
						<button
							type="button"
							onClick={onClose}
							className="action-button secondary-button"
						>
							Cancel
						</button>
						<button type="submit" className="action-button">
							{isEditing ? "Update Fiber Circuit" : "Create Fiber Circuit"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default FiberCircuitForm;
