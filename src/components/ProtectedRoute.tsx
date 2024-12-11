import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';  // Import isAuthenticated

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {  // Use the isAuthenticated function
            navigate('/login');
        }
    }, [navigate]);

    return <>{children}</>;
};

export default ProtectedRoute;
