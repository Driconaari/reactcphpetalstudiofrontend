// auth.ts
const AUTH_TOKEN_KEY = 'jwt_token';  // Key for storing the token in localStorage

// Check if the user is authenticated (i.e., if a token exists)
export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    return token !== null;
};

// Get the JWT token from localStorage
export const getToken = (): string | null => {
    return localStorage.getItem(AUTH_TOKEN_KEY);
};

// Set the JWT token in localStorage (called after successful login)
export const setToken = (token: string): void => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
};

// Remove the JWT token from localStorage (called on logout)
export const removeToken = (): void => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
};

// This could be used for validating if the token is expired (if the token contains expiration)
export const isTokenExpired = (token: string): boolean => {
    const payload = JSON.parse(atob(token.split('.')[1])); // Decoding JWT
    const currentTime = Math.floor(Date.now() / 1000);  // Get current time in seconds
    return payload.exp < currentTime;
};
