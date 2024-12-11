const API_BASE_URL = 'http://localhost:8080/api';  // Replace with your backend URL

// Fetch bouquets from API
export const fetchBouquets = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/bouquets`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch bouquets');
        }

        return response.json();  // Return bouquet data
    } catch (error) {
        console.error('Error fetching bouquets:', error);
        throw error;
    }
};
