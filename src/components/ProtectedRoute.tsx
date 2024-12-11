import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwt_token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    return <>{children}</>;
};

export default ProtectedRoute;
