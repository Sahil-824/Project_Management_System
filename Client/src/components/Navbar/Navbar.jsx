import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout?.();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-logo" onClick={() => navigate('/')}>ProjectHub</div>
      <ul className="nav-links">
        <li onClick={() => navigate('/dashboard')}>Dashboard</li>
        <li onClick={() => navigate('/projects')}>Projects</li>
        <li onClick={() => navigate('/tickets')}>Tickets</li>
        <li className="logout-btn" onClick={handleLogout}>Logout</li>
      </ul>
    </nav>
  );
};

export default Navbar;
