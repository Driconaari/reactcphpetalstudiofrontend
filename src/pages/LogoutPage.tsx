import { useNavigate } from 'react-router-dom';
import { removeToken } from '../utils/auth';
import {useEffect} from "react";  // Import removeToken function

const LogoutPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        removeToken();  // Remove the token from localStorage
        navigate('/login');  // Redirect to the login page
    }, [navigate]);

    return <div>Logging out...</div>;
};

export default LogoutPage;
