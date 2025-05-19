import React, { useEffect, useState } from 'react';

function ProjectForm({ onClose, onProjectCreated }) {
    const [formData, setFormData] = useState({
        name: "",
        venue: "",
        contractor: "",
        projectManager: "",
        fom: "",
        impEngineer: "",
        fiberCircuit: "",
        status: "",
        startDate: "",
        endDate: "",
        numberOfDays: "",
        numberOfPoles: "",
        numberOfVaults: "",
        numberOfFiberSplices: "",
        feetTrenching: "",
        feetConduit: "",
        feetFiber: "",
        numberOfInteriorAccessPoints: "",
        numberOfExteriorAccessPoints: "",
        headendInstallation: false,
        percentageComplete: "",
        numberOfDaysCompleted: "",
        numberOfPolesCompleted: "",
        numberOfVaultsCompleted: "",
        numberOfFiberSplicesCompleted: "",
        feetTrenchingCompleted: "",
        feetConduitCompleted: "",
        feetFiberCompleted: "",
        numberOfInteriorAccessPointsCompleted: "",
        numberOfExteriorAccessPointsCompleted: "",
        numberOfPointToPoints: "",
        numberOfPointToPointsCompleted: "",
        salesDealClosedDate: ""
    });
    const [error, setError] = useState("");

    // Dropdown data
    const [venues, setVenues] = useState([]);
    const [contractors, setContractors] = useState([]);
    const [projectManagers, setProjectManagers] = useState([]);
    const [foms, setFoms] = useState([]);
    const [impEngineers, setImpEngineers] = useState([]);
    const [fiberCircuits, setFiberCircuits] = useState([]);

    useEffect(() => {
        // Fetch all dropdown data in parallel
        Promise.all([
            fetch("/api/venues/list").then(r => r.json()),
            fetch("/api/contractors/list").then(r => r.json()),
            fetch("/api/projectManagers/list").then(r => r.json()),
            fetch("/api/foms/list").then(r => r.json()),
            fetch("/api/impEngineers/list").then(r => r.json()),
            fetch("/api/fiberCircuits/list").then(r => r.json())
        ]).then(([venues, contractors, projectManagers, foms, impEngineers, fiberCircuits]) => {
            setVenues(venues);
            setContractors(contractors);
            setProjectManagers(projectManagers);
            setFoms(foms);
            setImpEngineers(impEngineers);
            setFiberCircuits(fiberCircuits);
        }).catch(() => {
            setError("Failed to load dropdown data.");
        });
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setFormData({ ...formData, [name]: checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            // Prepare payload with nested objects for dropdowns
            const payload = {
                ...formData,
                venue: { id: Number(formData.venue) },
                contractor: { id: Number(formData.contractor) },
                projectManager: { id: Number(formData.projectManager) },
                fom: { id: Number(formData.fom) },
                impEngineer: { id: Number(formData.impEngineer) },
                fiberCircuit: { id: Number(formData.fiberCircuit) },
                numberOfDays: Number(formData.numberOfDays),
                numberOfPoles: Number(formData.numberOfPoles),
                numberOfVaults: Number(formData.numberOfVaults),
                numberOfFiberSplices: Number(formData.numberOfFiberSplices),
                feetTrenching: Number(formData.feetTrenching),
                feetConduit: Number(formData.feetConduit),
                feetFiber: Number(formData.feetFiber),
                numberOfInteriorAccessPoints: Number(formData.numberOfInteriorAccessPoints),
                numberOfExteriorAccessPoints: Number(formData.numberOfExteriorAccessPoints),
                percentageComplete: Number(formData.percentageComplete),
                numberOfDaysCompleted: Number(formData.numberOfDaysCompleted),
                numberOfPolesCompleted: Number(formData.numberOfPolesCompleted),
                numberOfVaultsCompleted: Number(formData.numberOfVaultsCompleted),
                numberOfFiberSplicesCompleted: Number(formData.numberOfFiberSplicesCompleted),
                feetTrenchingCompleted: Number(formData.feetTrenchingCompleted),
                feetConduitCompleted: Number(formData.feetConduitCompleted),
                feetFiberCompleted: Number(formData.feetFiberCompleted),
                numberOfInteriorAccessPointsCompleted: Number(formData.numberOfInteriorAccessPointsCompleted),
                numberOfExteriorAccessPointsCompleted: Number(formData.numberOfExteriorAccessPointsCompleted),
                numberOfPointToPoints: Number(formData.numberOfPointToPoints),
                numberOfPointToPointsCompleted: Number(formData.numberOfPointToPointsCompleted),
                headendInstallation: !!formData.headendInstallation
            };
            // Remove id if present
            delete payload.id;
            let response;
            try {
                response = await fetch("/api/projects", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                });
            } catch (networkError) {
                try {
                    response = await fetch("http://localhost:8080/api/projects", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(payload)
                    });
                } catch (networkError2) {
                    setError("Network error: Could not reach backend. Is it running and is CORS enabled?");
                    return;
                }
            }
            let data = null;
            try {
                data = await response.json();
            } catch {}
            if (!response.ok) {
                let msg = "Failed to create Project";
                if (data && data.message) msg = data.message;
                setError(msg + (response.status ? ` (HTTP ${response.status})` : ""));
                console.error("Project creation failed:", response.status, data);
                return;
            }
            onProjectCreated();
            onClose();
        } catch (err) {
            setError(err.message || "Failed to create Project");
            console.error("Unexpected error:", err);
        }
    };

    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
        }}>
            <div style={{
                backgroundColor: "white",
                padding: "32px 24px",
                borderRadius: "12px",
                width: "90%",
                maxWidth: "700px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
                color: "black",
                maxHeight: "90vh", // Add maxHeight
                overflowY: "auto"  // Enable vertical scroll
            }}>
                <h3 style={{ marginBottom: "1.5rem", color: "#333" }}>Create New Project</h3>
                {error && (
                    <div style={{
                        color: "#721c24",
                        backgroundColor: "#f8d7da",
                        border: "1px solid #f5c6cb",
                        borderRadius: "4px",
                        marginBottom: "16px",
                        padding: "12px"
                    }}>
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
                        <label style={{ width: "50%", marginRight: "8px" }}>Name:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required style={{ width: "50%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }} />
                    </div>
                    {/* Venue Dropdown */}
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
                        <label style={{ width: "50%", marginRight: "8px" }}>Venue:</label>
                        <select name="venue" value={formData.venue} onChange={handleInputChange} required style={{ width: "50%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}>
                            <option value="">Select Venue</option>
                            {venues.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                        </select>
                    </div>
                    {/* Contractor Dropdown */}
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
                        <label style={{ width: "50%", marginRight: "8px" }}>Contractor:</label>
                        <select name="contractor" value={formData.contractor} onChange={handleInputChange} required style={{ width: "50%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}>
                            <option value="">Select Contractor</option>
                            {contractors.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                    {/* Project Manager Dropdown */}
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
                        <label style={{ width: "50%", marginRight: "8px" }}>Project Manager:</label>
                        <select name="projectManager" value={formData.projectManager} onChange={handleInputChange} required style={{ width: "50%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}>
                            <option value="">Select Project Manager</option>
                            {projectManagers.map(pm => <option key={pm.id} value={pm.id}>{pm.name}</option>)}
                        </select>
                    </div>
                    {/* FOM Dropdown */}
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
                        <label style={{ width: "50%", marginRight: "8px" }}>FOM:</label>
                        <select name="fom" value={formData.fom} onChange={handleInputChange} required style={{ width: "50%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}>
                            <option value="">Select FOM</option>
                            {foms.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                        </select>
                    </div>
                    {/* Implementation Engineer Dropdown */}
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
                        <label style={{ width: "50%", marginRight: "8px" }}>Implementation Engineer:</label>
                        <select name="impEngineer" value={formData.impEngineer} onChange={handleInputChange} required style={{ width: "50%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}>
                            <option value="">Select Implementation Engineer</option>
                            {impEngineers.map(ie => <option key={ie.id} value={ie.id}>{ie.name}</option>)}
                        </select>
                    </div>
                    {/* Fiber Circuit Dropdown */}
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
                        <label style={{ width: "50%", marginRight: "8px" }}>Fiber Circuit:</label>
                        <select name="fiberCircuit" value={formData.fiberCircuit} onChange={handleInputChange} required style={{ width: "50%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}>
                            <option value="">Select Fiber Circuit</option>
                            {fiberCircuits.map(fc => <option key={fc.id} value={fc.id}>{fc.circuitId}</option>)}
                        </select>
                    </div>
                    {/* Status */}
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
                        <label style={{ width: "50%", marginRight: "8px" }}>Status:</label>
                        <input type="text" name="status" value={formData.status} onChange={handleInputChange} required style={{ width: "50%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }} />
                    </div>
                    {/* Start Date */}
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
                        <label style={{ width: "50%", marginRight: "8px" }}>Start Date:</label>
                        <input type="text" name="startDate" value={formData.startDate} onChange={handleInputChange} required style={{ width: "50%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }} />
                    </div>
                    {/* End Date */}
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
                        <label style={{ width: "50%", marginRight: "8px" }}>End Date:</label>
                        <input type="text" name="endDate" value={formData.endDate} onChange={handleInputChange} required style={{ width: "50%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }} />
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
                        ["numberOfInteriorAccessPoints", "Number of Interior Access Points"],
                        ["numberOfExteriorAccessPoints", "Number of Exterior Access Points"],
                        ["percentageComplete", "Percentage Complete"],
                        ["numberOfDaysCompleted", "Number of Days Completed"],
                        ["numberOfPolesCompleted", "Number of Poles Completed"],
                        ["numberOfVaultsCompleted", "Number of Vaults Completed"],
                        ["numberOfFiberSplicesCompleted", "Number of Fiber Splices Completed"],
                        ["feetTrenchingCompleted", "Feet Trenching Completed"],
                        ["feetConduitCompleted", "Feet Conduit Completed"],
                        ["feetFiberCompleted", "Feet Fiber Completed"],
                        ["numberOfInteriorAccessPointsCompleted", "Number of Interior Access Points Completed"],
                        ["numberOfExteriorAccessPointsCompleted", "Number of Exterior Access Points Completed"],
                        ["numberOfPointToPoints", "Number of Point To Points"],
                        ["numberOfPointToPointsCompleted", "Number of Point To Points Completed"]
                    ].map(([key, label]) => (
                        <div key={key} style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
                            <label style={{ width: "50%", marginRight: "8px" }}>{label}:</label>
                            <input
                                type="number"
                                name={key}
                                value={formData[key]}
                                onChange={handleInputChange}
                                required
                                style={{ width: "50%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
                            />
                        </div>
                    ))}
                    {/* Headend Installation */}
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
                        <label style={{ width: "50%", marginRight: "8px" }}>Headend Installation:</label>
                        <input
                            type="checkbox"
                            name="headendInstallation"
                            checked={formData.headendInstallation}
                            onChange={handleInputChange}
                            style={{ width: "20px", height: "20px" }}
                        />
                    </div>
                    {/* Sales Deal Closed Date */}
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
                        <label style={{ width: "50%", marginRight: "8px" }}>Sales Deal Closed Date:</label>
                        <input type="text" name="salesDealClosedDate" value={formData.salesDealClosedDate} onChange={handleInputChange} required style={{ width: "50%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }} />
                    </div>
                    <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                padding: "8px 16px",
                                backgroundColor: "#ccc",
                                color: "#333",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer"
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
                                cursor: "pointer"
                            }}
                        >
                            Create Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProjectForm;
