// Store token in localStorage
export const setToken = (token: string) => {
    localStorage.setItem('jwt_token', token);
};

// Get token from localStorage
export const getToken = (): string | null => {
    return localStorage.getItem('jwt_token');
};

// Remove token from localStorage
export const removeToken = () => {
    localStorage.removeItem('jwt_token');
};

// Check if token is expired (you may need a proper JWT decode library like jwt-decode)
export const isTokenExpired = (token: string): boolean => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decoding JWT payload
        const expiration = payload.exp * 1000; // Convert to milliseconds
        return Date.now() > expiration;
    } catch (error) {
        return true; // If something goes wrong, consider the token expired
    }
};
