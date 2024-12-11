import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../utils/auth';  // Get token utility function

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = getToken();
        if (!token) {
            navigate('/login');  // Redirect to login page if no token
        }
    }, [navigate]);

    return <>{children}</>;  // Render children if token exists
};

export default ProtectedRoute;
