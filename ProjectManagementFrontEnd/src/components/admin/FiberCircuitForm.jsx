import React, { useState } from "react";

function FiberCircuitForm({ onClose, onFiberCircuitCreated }) {
	const [formData, setFormData] = useState({
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
			// Remove id if present
			const { id, ...payload } = formData;
			let response;
			try {
				response = await fetch("/api/fiberCircuits", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
				});
			} catch (networkError) {
				try {
					response = await fetch("http://localhost:8080/api/fiberCircuits", {
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
			} catch {}
			if (!response.ok) {
				let msg = "Failed to create Fiber Circuit";
				if (data && data.message) msg = data.message;
				setError(msg + (response.status ? ` (HTTP ${response.status})` : ""));
				console.error("Fiber Circuit creation failed:", response.status, data);
				return;
			}
			onFiberCircuitCreated();
			onClose();
		} catch (err) {
			setError(err.message || "Failed to create Fiber Circuit");
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
					padding: "32px 24px",
					borderRadius: "12px",
					width: "90%",
					maxWidth: "600px",
					boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
					color: "black",
				}}
			>
				<h3 style={{ marginBottom: "1.5rem", color: "#333" }}>
					Create New Fiber Circuit
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
							Create Fiber Circuit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default FiberCircuitForm;
