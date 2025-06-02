import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

function ProjectCalendar() {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				let response = await fetch("/api/projects/list");
				if (!response.ok) {
					response = await fetch("http://localhost:8080/api/projects/list");
					if (!response.ok) throw new Error("Failed to fetch projects");
				}
				const data = await response.json();
				setProjects(data);
				setLoading(false);
			} catch (err) {
				setError(err.message);
				setLoading(false);
			}
		};

		fetchProjects();
	}, []);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	const calendarEvents = projects.map((project) => ({
		title: project.name,
		start: new Date(project.startDate),
		end: new Date(project.endDate),
		backgroundColor: project.status === "Live" ? "#f4b942" : "#033244",
		borderColor: "#033244",
		display: "block",
		extendedProps: {
			status: project.status,
			contractor: project.contractor?.name,
		},
	}));

	return (
		<div className="calendar-container">
			<h2>Project Timeline</h2>
			<div className="calendar-wrapper">
				<FullCalendar
					plugins={[dayGridPlugin, timeGridPlugin]}
					initialView="dayGridMonth"
					events={calendarEvents}
					eventDisplay="block"
					headerToolbar={{
						left: "prev,next today",
						center: "title",
						right: "dayGridMonth,timeGridWeek",
					}}
					eventContent={(eventInfo) => {
						return (
							<div className="fc-event-main-inner">
								<strong>{eventInfo.event.title}</strong>
								<div>{eventInfo.event.extendedProps.status}</div>
								<div>{eventInfo.event.extendedProps.contractor}</div>
							</div>
						);
					}}
					height="auto"
				/>
			</div>
		</div>
	);
}

export default ProjectCalendar;
