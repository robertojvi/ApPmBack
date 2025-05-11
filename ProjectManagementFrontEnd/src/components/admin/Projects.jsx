import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('/api/projects/list');
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                console.log('Received data:', data);
                setProjects(data);
            } catch (error) {
                console.error('Error:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="projects-container" style={{ color: 'black' }}>
            <h2>Projects List</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', color: 'black' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f4f4f4' }}>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd', color: 'black' }}>Name</th>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd', color: 'black' }}>Status</th>
                        <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid #ddd', color: 'black' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <tr key={project.id} style={{ borderBottom: '1px solid #ddd', color: 'black' }}>
                            <td style={{ padding: '12px' }}>{project.name}</td>
                            <td style={{ padding: '12px' }}>{project.status}</td>
                            <td style={{ padding: '12px', textAlign: 'center' }}>
                                <FaEdit style={{ cursor: 'pointer', marginRight: '10px' }} />
                                <FaTrash style={{ cursor: 'pointer', marginRight: '10px' }} />
                                <FaPlus style={{ cursor: 'pointer' }} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Projects;
