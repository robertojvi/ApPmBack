import { Link } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file for styling

function Navbar() {
	return (
		<nav className="navbar">
			<ul className="navbar-links">
				<li>
					<Link to="/">Home Page</Link>
				</li>
				<li>
					<Link to="/project-management">Project Management</Link>
				</li>
				<li>
					<Link to="/admin">Administration Page</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
