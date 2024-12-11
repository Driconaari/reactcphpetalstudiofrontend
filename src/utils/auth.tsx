// auth.ts
import { jwtDecode } from 'jwt-decode';
interface TokenPayload {
    exp: number;
    [key: string]: unknown; // Other potential claims
}

export const isTokenExpired = (token: string): boolean => {
    try {
        const payload: TokenPayload = jwtDecode(token);
        return Date.now() > payload.exp * 1000;
    } catch {
        return true; // Consider invalid tokens as expired
    }
};

export const setToken = (token: string) => {
    localStorage.setItem('jwt_token', token);
};

export const getToken = (): string | null => {
    return localStorage.getItem('jwt_token');
};

export const removeToken = () => {
    localStorage.removeItem('jwt_token');
};