import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Client.css';

const Client = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Replace this with your actual API URL
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming token is stored here
        const response = await axios.get('https://your-api.com/api/projects', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects(response.data.projects); // Assuming response structure
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Optionally redirect to login if unauthorized
        if (error.response?.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchProjects();
  }, [navigate]);

  // If no API yet, use hardcoded fallback (for dev)
  const fallbackProjects = [
    {
      id: 1,
      name: 'Travel App',
      status: 'Completed',
      image: 'https://via.placeholder.com/300x180',
    },
    {
      id: 2,
      name: 'HR Portal',
      status: 'Pending',
      image: 'https://via.placeholder.com/300x180',
    },
    {
      id: 3,
      name: 'E-commerce Store',
      status: 'Completed',
      image: 'https://via.placeholder.com/300x180',
    },
        {
      id: 1,
      name: 'Travel App',
      status: 'Completed',
      image: 'https://via.placeholder.com/300x180',
    },
    {
      id: 2,
      name: 'HR Portal',
      status: 'Pending',
      image: 'https://via.placeholder.com/300x180',
    },
    {
      id: 3,
      name: 'E-commerce Store',
      status: 'Completed',
      image: 'https://via.placeholder.com/300x180',
    },
        {
      id: 1,
      name: 'Travel App',
      status: 'Completed',
      image: 'https://via.placeholder.com/300x180',
    },
    {
      id: 2,
      name: 'HR Portal',
      status: 'Pending',
      image: 'https://via.placeholder.com/300x180',
    },
    {
      id: 3,
      name: 'E-commerce Store',
      status: 'Completed',
      image: 'https://via.placeholder.com/300x180',
    },
        {
      id: 1,
      name: 'Travel App',
      status: 'Completed',
      image: 'https://via.placeholder.com/300x180',
    },
    {
      id: 2,
      name: 'HR Portal',
      status: 'Pending',
      image: 'https://via.placeholder.com/300x180',
    },
    {
      id: 3,
      name: 'E-commerce Store',
      status: 'Completed',
      image: 'https://via.placeholder.com/300x180',
    },
        {
      id: 1,
      name: 'Travel App',
      status: 'Completed',
      image: 'https://via.placeholder.com/300x180',
    },
    {
      id: 2,
      name: 'HR Portal',
      status: 'Pending',
      image: 'https://via.placeholder.com/300x180',
    },
    {
      id: 3,
      name: 'E-commerce Store',
      status: 'Completed',
      image: 'https://via.placeholder.com/300x180',
    },
  ];

  const projectList = projects.length > 0 ? projects : fallbackProjects;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Your Projects</h1>
      <div className="project-grid">
        {projectList.map((project) => (
          <div key={project.id} className="project-card">
            <img src={project.image} alt={project.name} className="project-image" />
            <div className="project-info">
              <h2 className="project-name">{project.name}</h2>
              <p className={`project-status ${project.status.toLowerCase()}`}>
                {project.status}
              </p>
              <button
                className="project-button"
                onClick={() => navigate(`/project`)}
              >
                Go to Project
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Client;
