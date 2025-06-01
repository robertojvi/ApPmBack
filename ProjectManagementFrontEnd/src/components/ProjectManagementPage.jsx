import React, { useState } from "react";
import "./ProjectManagementPage.css";
import Dashboard from "./projectManagement/Dashboard";
import ActiveProjects from "./projectManagement/ActiveProjects";
import CompletedProjects from "./projectManagement/CompletedProjects";
import ProjectCalendar from "./projectManagement/ProjectCalendar";
import Reports from "./projectManagement/Reports";

function ProjectManagementPage() {
	const [selectedSection, setSelectedSection] = useState("Dashboard");

	const renderContent = () => {
		switch (selectedSection) {
			case "Dashboard":
				return <Dashboard />;
			case "Active Projects":
				return <ActiveProjects />;
			case "Completed Projects":
				return <CompletedProjects />;
			case "Project Calendar":
				return <ProjectCalendar />;
			case "Reports":
				return <Reports />;
			default:
				return <Dashboard />;
		}
	};

	return (
		<div className="project-management-page">
			<nav className="project-navbar">
				<ul>
					<li
						className={selectedSection === "Dashboard" ? "active" : ""}
						onClick={() => setSelectedSection("Dashboard")}
					>
						Dashboard
					</li>
					<li
						className={selectedSection === "Active Projects" ? "active" : ""}
						onClick={() => setSelectedSection("Active Projects")}
					>
						Active Projects
					</li>
					<li
						className={selectedSection === "Completed Projects" ? "active" : ""}
						onClick={() => setSelectedSection("Completed Projects")}
					>
						Completed Projects
					</li>
					<li
						className={selectedSection === "Project Calendar" ? "active" : ""}
						onClick={() => setSelectedSection("Project Calendar")}
					>
						Project Calendar
					</li>
					<li
						className={selectedSection === "Reports" ? "active" : ""}
						onClick={() => setSelectedSection("Reports")}
					>
						Reports
					</li>
				</ul>
			</nav>
			<div className="project-content">{renderContent()}</div>
		</div>
	);
}

export default ProjectManagementPage;
