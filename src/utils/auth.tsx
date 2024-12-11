import {jwtDecode} from 'jwt-decode';

interface TokenPayload {
    exp: number;
    [key: string]: unknown; // Other potential claims
}

const isValidJwt = (token: string): boolean => {
    const parts = token.split('.');
    return parts.length === 3;
};

export const isTokenExpired = (token: string): boolean => {
    if (!isValidJwt(token)) {
        return true; // Consider invalid tokens as expired
    }

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