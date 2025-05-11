import { Project } from "../types/Project";

export const fetchProjects = async (): Promise<Project[]> => {
	const response = await fetch("http://localhost:8080/api/projects/list", {
		headers: {
			Accept: "application/json",
		},
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	return response.json();
};
