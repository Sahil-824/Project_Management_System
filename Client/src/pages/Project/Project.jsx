    import React, { useEffect, useState } from 'react';
    import { useParams, useNavigate } from 'react-router-dom';
    import axios from 'axios';
    import './project.css';

    const Project = () => {
    const { id } = useParams(); // project ID from route
    const navigate = useNavigate();

    const [project, setProject] = useState(null);
    const [pullRequests, setPullRequests] = useState([]);
    const [commits, setCommits] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        assignee: '',
    });

    useEffect(() => {
        const fetchProjectDetails = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`https://your-api.com/api/projects/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
            });

            setProject(response.data.project);
            setPullRequests(response.data.pullRequests || []);
            setCommits(response.data.commits || []);
        } catch (error) {
            console.error('Error fetching project details:', error);
            if (error.response?.status === 401) {
            navigate('/login');
            }
        }
        };

        fetchProjectDetails();
    }, [id, navigate]);

    const handleInputChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const token = localStorage.getItem('token');
        await axios.post(`https://your-api.com/api/projects/${id}/tickets`, formData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        alert('Ticket created successfully!');
        setFormData({ title: '', description: '', assignee: '' });
        } catch (error) {
        console.error('Error creating ticket:', error);
        alert('Failed to create ticket.');
        }
    };

    // Optional fallback for dev/testing
    const fallbackProject = {
        name: 'Travel App',
        description: 'Connect people through travel and shared experiences.',
    };

    const displayProject = project || fallbackProject;
    const displayPRs = pullRequests.length ? pullRequests : [
        { id: 1, title: "Fix login bug", status: "Open" },
        { id: 2, title: "Add filters", status: "Merged" },
    ];
    const displayCommits = commits.length ? commits : [
        { id: 1, message: "Initial commit", author: "Sahil", date: "2025-07-10" },
        { id: 2, message: "Setup routing", author: "Ravi", date: "2025-07-12" },
    ];

    return (
        <div className="project-details-container">
        <div className="main-content">
            <h1 className="project-title">{displayProject.name}</h1>
            <p className="project-description">{displayProject.description}</p>

            <section className="pr-section">
            <h2>Pull Requests</h2>
            <ul>
                {displayPRs.map(pr => (
                <li key={pr.id} className={`pr-item ${pr.status.toLowerCase()}`}>
                    <span>{pr.title}</span>
                    <span className="pr-status">{pr.status}</span>
                </li>
                ))}
            </ul>
            </section>

            <section className="commit-section">
            <h2>Commit History</h2>
            <ul>
                {displayCommits.map(commit => (
                <li key={commit.id} className="commit-item">
                    <p>{commit.message}</p>
                    <small>by {commit.author} on {commit.date}</small>
                </li>
                ))}
            </ul>
            </section>
        </div>

        <aside className="ticket-sidebar">
            <h2>Raise Ticket</h2>
            <form className="ticket-form" onSubmit={handleSubmit}>
            <label>Title</label>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Issue Title"
            />

            <label>Description</label>
            <textarea
                rows="4"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the issue..."
            />

            <label>Assign To</label>
            <select
                name="assignee"
                value={formData.assignee}
                onChange={handleInputChange}
            >
                <option value="">Select user</option>
                <option value="Sahil">Sahil</option>
                <option value="Aditi">Aditi</option>
                <option value="Ravi">Ravi</option>
            </select>

            <button type="submit">Create Ticket</button>
            </form>
        </aside>
        </div>
    );
    };

    export default Project;
