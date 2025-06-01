import React, { useEffect, useState } from "react";

function ProjectForm({ onClose, onProjectCreated, initialData, isEditing }) {
	const [formData, setFormData] = useState({
		name: "",
		venue: { id: "" },
		contractor: { id: "" },
		projectManager: { id: "" },
		fom: { id: "" },
		impEngineer: { id: "" },
		fiberCircuit: { id: "" },
		status: "",
		startDate: "",
		endDate: "",
		numberOfDays: 0,
		numberOfPoles: 0,
		numberOfVaults: 0,
		numberOfFiberSplices: 0,
		feetTrenching: 0,
		feetConduit: 0,
		feetFiber: 0,
		numberOfInteriorAccessPoints: 0,
		numberOfExteriorAccessPoints: 0,
		headendInstallation: false,
		percentageComplete: 0,
		numberOfDaysCompleted: 0,
		numberOfPolesCompleted: 0,
		numberOfVaultsCompleted: 0,
		numberOfFiberSplicesCompleted: 0,
		feetTrenchingCompleted: 0,
		feetConduitCompleted: 0,
		feetFiberCompleted: 0,
		numberOfInteriorAccessPointsCompleted: 0,
		numberOfExteriorAccessPointsCompleted: 0,
		numberOfPointToPoints: 0,
		numberOfPointToPointsCompleted: 0,
		salesDealClosedDate: "",
	});

	const [venues, setVenues] = useState([]);
	const [contractors, setContractors] = useState([]);
	const [projectManagers, setProjectManagers] = useState([]);
	const [foms, setFoms] = useState([]);
	const [impEngineers, setImpEngineers] = useState([]);
	const [fiberCircuits, setFiberCircuits] = useState([]);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchWithFallback = async (path) => {
			try {
				let response = await fetch(`/api${path}`);
				if (!response.ok) {
					response = await fetch(`http://localhost:8080/api${path}`);
					if (!response.ok)
						throw new Error(`HTTP error! status: ${response.status}`);
				}
				return await response.json();
			} catch (error) {
				console.error(`Error fetching ${path}:`, error);
				throw error;
			}
		};

		const loadAllData = async () => {
			try {
				const [
					venuesData,
					contractorsData,
					managersData,
					fomsData,
					engineersData,
					circuitsData,
				] = await Promise.all([
					fetchWithFallback("/venues/list"),
					fetchWithFallback("/contractors/list"),
					fetchWithFallback("/projectManagers/list"),
					fetchWithFallback("/foms/list"),
					fetchWithFallback("/impEngineers/list"),
					fetchWithFallback("/fiberCircuits/list"),
				]);

				setVenues(venuesData);
				setContractors(contractorsData);
				setProjectManagers(managersData);
				setFoms(fomsData);
				setImpEngineers(engineersData);
				setFiberCircuits(circuitsData);
			} catch (err) {
				console.error("Error loading form data:", err);
				setError("Failed to load form data. Please try again.");
			}
		};

		loadAllData();
	}, []);

	useEffect(() => {
		if (initialData) {
			setFormData(initialData);
		}
	}, [initialData]);

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;

		// Handle nested objects (dropdowns)
		if (
			[
				"venue",
				"contractor",
				"projectManager",
				"fom",
				"impEngineer",
				"fiberCircuit",
			].includes(name)
		) {
			setFormData((prev) => ({
				...prev,
				[name]: value ? { id: Number(value) } : null,
			}));
		}
		// Handle checkboxes
		else if (type === "checkbox") {
			setFormData((prev) => ({
				...prev,
				[name]: checked,
			}));
		}
		// Handle numeric fields
		else if (type === "number") {
			setFormData((prev) => ({
				...prev,
				[name]: value ? Number(value) : 0,
			}));
		}
		// Handle other fields
		else {
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		try {
			const payload = {
				...formData,
				id: isEditing ? Number(formData.id) : undefined,
				venue: { id: Number(formData.venue.id) },
				contractor: { id: Number(formData.contractor.id) },
				projectManager: { id: Number(formData.projectManager.id) },
				fom: { id: Number(formData.fom.id) },
				impEngineer: { id: Number(formData.impEngineer.id) },
				fiberCircuit: { id: Number(formData.fiberCircuit.id) },
				// Convert numeric fields
				numberOfDays: Number(formData.numberOfDays),
				numberOfPoles: Number(formData.numberOfPoles),
				numberOfVaults: Number(formData.numberOfVaults),
				numberOfFiberSplices: Number(formData.numberOfFiberSplices),
				feetTrenching: Number(formData.feetTrenching),
				feetConduit: Number(formData.feetConduit),
				feetFiber: Number(formData.feetFiber),
				numberOfInteriorAccessPoints: Number(
					formData.numberOfInteriorAccessPoints
				),
				numberOfExteriorAccessPoints: Number(
					formData.numberOfExteriorAccessPoints
				),
				percentageComplete: Number(formData.percentageComplete),
				numberOfDaysCompleted: Number(formData.numberOfDaysCompleted),
				numberOfPolesCompleted: Number(formData.numberOfPolesCompleted),
				numberOfVaultsCompleted: Number(formData.numberOfVaultsCompleted),
				numberOfFiberSplicesCompleted: Number(
					formData.numberOfFiberSplicesCompleted
				),
				feetTrenchingCompleted: Number(formData.feetTrenchingCompleted),
				feetConduitCompleted: Number(formData.feetConduitCompleted),
				feetFiberCompleted: Number(formData.feetFiberCompleted),
				numberOfInteriorAccessPointsCompleted: Number(
					formData.numberOfInteriorAccessPointsCompleted
				),
				numberOfExteriorAccessPointsCompleted: Number(
					formData.numberOfExteriorAccessPointsCompleted
				),
				numberOfPointToPoints: Number(formData.numberOfPointToPoints),
				numberOfPointToPointsCompleted: Number(
					formData.numberOfPointToPointsCompleted
				),
			};

			let response;
			try {
				response = await fetch("/api/projects", {
					method: isEditing ? "PUT" : "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
					},
					body: JSON.stringify(payload),
				});
			} catch (networkError) {
				response = await fetch("http://localhost:8080/api/projects", {
					method: isEditing ? "PUT" : "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
					},
					body: JSON.stringify(payload),
				});
			}

			if (!response.ok) {
				const errorData = await response.json().catch(() => null);
				throw new Error(
					errorData?.message || `HTTP error! status: ${response.status}`
				);
			}

			onProjectCreated();
			onClose();
		} catch (err) {
			console.error("Error saving project:", err);
			setError(
				`Failed to ${isEditing ? "update" : "create"} project: ${err.message}`
			);
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
					maxWidth: "700px",
					boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
					color: "black",
					maxHeight: "90vh", // Add maxHeight
					overflowY: "auto", // Enable vertical scroll
				}}
			>
				<h3 style={{ marginBottom: "1.5rem", color: "#333" }}>
					{isEditing ? "Edit Project" : "Create New Project"}
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
					{/* Name */}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginBottom: "16px",
						}}
					>
						<label style={{ width: "50%", marginRight: "8px" }}>Name:</label>
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
					{/* Venue Dropdown */}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginBottom: "16px",
						}}
					>
						<label style={{ width: "50%", marginRight: "8px" }}>Venue:</label>
						<select
							name="venue"
							value={formData.venue.id}
							onChange={handleInputChange}
							required
							style={{
								width: "50%",
								padding: "8px",
								border: "1px solid #ddd",
								borderRadius: "4px",
							}}
						>
							<option value="">Select Venue</option>
							{venues.map((v) => (
								<option key={v.id} value={v.id}>
									{v.name}
								</option>
							))}
						</select>
					</div>
					{/* Contractor Dropdown */}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginBottom: "16px",
						}}
					>
						<label style={{ width: "50%", marginRight: "8px" }}>
							Contractor:
						</label>
						<select
							name="contractor"
							value={formData.contractor.id}
							onChange={handleInputChange}
							required
							style={{
								width: "50%",
								padding: "8px",
								border: "1px solid #ddd",
								borderRadius: "4px",
							}}
						>
							<option value="">Select Contractor</option>
							{contractors.map((c) => (
								<option key={c.id} value={c.id}>
									{c.name}
								</option>
							))}
						</select>
					</div>
					{/* Project Manager Dropdown */}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginBottom: "16px",
						}}
					>
						<label style={{ width: "50%", marginRight: "8px" }}>
							Project Manager:
						</label>
						<select
							name="projectManager"
							value={formData.projectManager.id}
							onChange={handleInputChange}
							required
							style={{
								width: "50%",
								padding: "8px",
								border: "1px solid #ddd",
								borderRadius: "4px",
							}}
						>
							<option value="">Select Project Manager</option>
							{projectManagers.map((pm) => (
								<option key={pm.id} value={pm.id}>
									{pm.name}
								</option>
							))}
						</select>
					</div>
					{/* FOM Dropdown */}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginBottom: "16px",
						}}
					>
						<label style={{ width: "50%", marginRight: "8px" }}>FOM:</label>
						<select
							name="fom"
							value={formData.fom.id}
							onChange={handleInputChange}
							required
							style={{
								width: "50%",
								padding: "8px",
								border: "1px solid #ddd",
								borderRadius: "4px",
							}}
						>
							<option value="">Select FOM</option>
							{foms.map((f) => (
								<option key={f.id} value={f.id}>
									{f.name}
								</option>
							))}
						</select>
					</div>
					{/* Implementation Engineer Dropdown */}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginBottom: "16px",
						}}
					>
						<label style={{ width: "50%", marginRight: "8px" }}>
							Implementation Engineer:
						</label>
						<select
							name="impEngineer"
							value={formData.impEngineer.id}
							onChange={handleInputChange}
							required
							style={{
								width: "50%",
								padding: "8px",
								border: "1px solid #ddd",
								borderRadius: "4px",
							}}
						>
							<option value="">Select Implementation Engineer</option>
							{impEngineers.map((ie) => (
								<option key={ie.id} value={ie.id}>
									{ie.name}
								</option>
							))}
						</select>
					</div>
					{/* Fiber Circuit Dropdown */}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginBottom: "16px",
						}}
					>
						<label style={{ width: "50%", marginRight: "8px" }}>
							Fiber Circuit:
						</label>
						<select
							name="fiberCircuit"
							value={formData.fiberCircuit.id}
							onChange={handleInputChange}
							required
							style={{
								width: "50%",
								padding: "8px",
								border: "1px solid #ddd",
								borderRadius: "4px",
							}}
						>
							<option value="">Select Fiber Circuit</option>
							{fiberCircuits.map((fc) => (
								<option key={fc.id} value={fc.id}>
									{fc.providerName}
								</option>
							))}
						</select>
					</div>
					{/* Status */}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginBottom: "16px",
						}}
					>
						<label style={{ width: "50%", marginRight: "8px" }}>Status:</label>
						<input
							type="text"
							name="status"
							value={formData.status}
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
					{/* Start Date */}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginBottom: "16px",
						}}
					>
						<label style={{ width: "50%", marginRight: "8px" }}>
							Start Date:
						</label>
						<input
							type="text"
							name="startDate"
							value={formData.startDate}
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
					{/* End Date */}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginBottom: "16px",
						}}
					>
						<label style={{ width: "50%", marginRight: "8px" }}>
							End Date:
						</label>
						<input
							type="text"
							name="endDate"
							value={formData.endDate}
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
					{/* Numeric fields */}
					{[
						["numberOfDays", "Number of Days"],
						["numberOfPoles", "Number of Poles"],
						["numberOfVaults", "Number of Vaults"],
						["numberOfFiberSplices", "Number of Fiber Splices"],
						["feetTrenching", "Feet Trenching"],
						["feetConduit", "Feet Conduit"],
						["feetFiber", "Feet Fiber"],
						[
							"numberOfInteriorAccessPoints",
							"Number of Interior Access Points",
						],
						[
							"numberOfExteriorAccessPoints",
							"Number of Exterior Access Points",
						],
						["percentageComplete", "Percentage Complete"],
						["numberOfDaysCompleted", "Number of Days Completed"],
						["numberOfPolesCompleted", "Number of Poles Completed"],
						["numberOfVaultsCompleted", "Number of Vaults Completed"],
						[
							"numberOfFiberSplicesCompleted",
							"Number of Fiber Splices Completed",
						],
						["feetTrenchingCompleted", "Feet Trenching Completed"],
						["feetConduitCompleted", "Feet Conduit Completed"],
						["feetFiberCompleted", "Feet Fiber Completed"],
						[
							"numberOfInteriorAccessPointsCompleted",
							"Number of Interior Access Points Completed",
						],
						[
							"numberOfExteriorAccessPointsCompleted",
							"Number of Exterior Access Points Completed",
						],
						["numberOfPointToPoints", "Number of Point To Points"],
						[
							"numberOfPointToPointsCompleted",
							"Number of Point To Points Completed",
						],
					].map(([key, label]) => (
						<div
							key={key}
							style={{
								display: "flex",
								alignItems: "center",
								marginBottom: "16px",
							}}
						>
							<label style={{ width: "50%", marginRight: "8px" }}>
								{label}:
							</label>
							<input
								type="number"
								name={key}
								value={formData[key]}
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
					))}
					{/* Headend Installation */}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginBottom: "16px",
						}}
					>
						<label style={{ width: "50%", marginRight: "8px" }}>
							Headend Installation:
						</label>
						<input
							type="checkbox"
							name="headendInstallation"
							checked={formData.headendInstallation}
							onChange={handleInputChange}
							style={{ width: "20px", height: "20px" }}
						/>
					</div>
					{/* Sales Deal Closed Date */}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginBottom: "16px",
						}}
					>
						<label style={{ width: "50%", marginRight: "8px" }}>
							Sales Deal Closed Date:
						</label>
						<input
							type="text"
							name="salesDealClosedDate"
							value={formData.salesDealClosedDate}
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
							{isEditing ? "Update Project" : "Create Project"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default ProjectForm;
