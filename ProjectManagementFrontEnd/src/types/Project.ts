export interface Project {
	id: number;
	name: string;
	venue: Venue;
	contractor: Contractor;
	projectManager: ProjectManager;
	fom: FOM;
	impEngineer: ImpEngineer;
	fiberCircuit: FiberCircuit;
	status: string;
	startDate: string;
	endDate: string;
	numberOfDays: number;
	percentageComplete: number;
	// ... add other fields as needed
}

// Add interfaces for nested objects
interface Venue {
	id: number;
	name: string;
	// ... other venue fields
}

// ... other interfaces
