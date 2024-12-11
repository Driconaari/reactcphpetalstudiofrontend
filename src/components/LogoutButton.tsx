import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to log out?');
        if (confirmLogout) {
            // Perform logout actions (e.g., clear token, reset state)
            localStorage.removeItem('jwt_token');
            // Navigate to login page
            navigate('/login');
        }
    };

    return (
        <button className="btn btn-danger" onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;

