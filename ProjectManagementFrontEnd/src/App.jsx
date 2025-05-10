import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import AdminPage from "./components/AdminPage";
import ProjectManagementPage from "./components/ProjectManagementPage";

function App() {
	return (
		<Router>
			<div>
				<Navbar />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/admin" element={<AdminPage />} />
					<Route
						path="/project-management"
						element={<ProjectManagementPage />}
					/>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
