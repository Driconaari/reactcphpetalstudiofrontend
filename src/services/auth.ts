import { setToken, removeToken, isTokenExpired, getToken } from '../utils/auth';

const API_BASE_URL = 'http://localhost:8080/api'; // Replace with your backend URL

// Login function
export const login = async (username: string, password: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const { token } = await response.json();
        setToken(token);  // Save token to localStorage
        return token;     // Return token for use in the app
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

// Logout function
export const logout = () => {
    removeToken();  // Remove token from localStorage
};

// Fetch user profile
export const fetchProfile = async () => {
    const token = getToken();
    if (!token) throw new Error('No token found');

    if (isTokenExpired(token)) {
        throw new Error('Token is expired');
    }

    try {
        const response = await fetch(`${API_BASE_URL}/user/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch profile');
        }

        return response.json();  // Return profile data
    } catch (error) {
        console.error('Profile fetch error:', error);
        throw error;
    }
};
