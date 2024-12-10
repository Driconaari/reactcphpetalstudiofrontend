export const fetchBouquets = async () => {
    const response = await fetch('http://localhost:8080/api/bouquets');
    if (!response.ok) throw new Error('Failed to fetch bouquets');
    return response.json();
};

export const fetchProfile = async (token: string) => {
    const response = await fetch('http://localhost:8080/api/user/profile', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) throw new Error('Failed to fetch profile');
    return response.json();
};
