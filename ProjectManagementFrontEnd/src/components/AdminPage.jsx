import React, { useState } from "react";
import "./AdminPage.css";
import Projects from "./admin/Projects";
import Venues from "./admin/Venues";
import Contractors from "./admin/Contractors";
import ProjectManagers from "./admin/ProjectManagers";
import Forms from "./admin/Forms";
import ImplementationEngineers from "./admin/ImplementationEngineers";
import FiberCircuits from "./admin/FiberCircuits";

function AdminPage() {
	const [selectedComponent, setSelectedComponent] = useState("Projects");

	const renderComponent = () => {
		switch (selectedComponent) {
			case "Projects":
				return <Projects />;
			case "Venues":
				return <Venues />;
			case "Contractors":
				return <Contractors />;
			case "Project Managers":
				return <ProjectManagers />;
			case "Forms":
				return <Forms />;
			case "Implementation Engineers":
				return <ImplementationEngineers />;
			case "Fiber Circuits":
				return <FiberCircuits />;
			default:
				return <h1>Select a component</h1>;
		}
	};

	return (
		<div
			className="admin-page"
			style={{ display: "flex", width: "100vw", height: "100vh" }}
		>
			<nav className="admin-navbar" style={{ width: "30%", height: "100%" }}>
				<ul>
					<li
						className={selectedComponent === "Projects" ? "active" : ""}
						onClick={() => setSelectedComponent("Projects")}
					>
						Projects
					</li>
					<li
						className={selectedComponent === "Venues" ? "active" : ""}
						onClick={() => setSelectedComponent("Venues")}
					>
						Venues
					</li>
					<li
						className={selectedComponent === "Contractors" ? "active" : ""}
						onClick={() => setSelectedComponent("Contractors")}
					>
						Contractors
					</li>
					<li
						className={selectedComponent === "Project Managers" ? "active" : ""}
						onClick={() => setSelectedComponent("Project Managers")}
					>
						Project Managers
					</li>
					<li
						className={selectedComponent === "Forms" ? "active" : ""}
						onClick={() => setSelectedComponent("Forms")}
					>
						Forms
					</li>
					<li
						className={
							selectedComponent === "Implementation Engineers" ? "active" : ""
						}
						onClick={() => setSelectedComponent("Implementation Engineers")}
					>
						Implementation Engineers
					</li>
					<li
						className={selectedComponent === "Fiber Circuits" ? "active" : ""}
						onClick={() => setSelectedComponent("Fiber Circuits")}
					>
						Fiber Circuits
					</li>
				</ul>
			</nav>
			<div className="admin-content">{renderComponent()}</div>
		</div>
	);
}

export default AdminPage;
