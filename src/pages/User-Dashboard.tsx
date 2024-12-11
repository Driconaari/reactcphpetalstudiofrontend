import { useEffect, useState } from 'react';

interface UserProfile {
    username: string;
    email: string;
    createdAt: string;
}

const UserDashboard = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/user/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data: UserProfile = await response.json();
                console.log('Profile fetched successfully:', data); // Debugging log
                setProfile(data);
            } catch (err) {
                console.error('Error fetching profile:', err);
                setError(err instanceof Error ? err.message : 'Unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container">
            <h1>Welcome</h1>

            <div className="section">
                <h2>Your Account Information</h2>
                <p><strong>Username:</strong> {profile?.username || 'N/A'}</p>
                <p><strong>Email:</strong> {profile?.email || 'N/A'}</p>
                <p><strong>Account Created:</strong> {profile ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}</p>
                <a href="/logout" className="bg-dark-pink">Logout</a>
            </div>

            <div className="section grid">
                <div>
                    <h2>Browse Bouquets</h2>
                    <a href="/bouquets/list" className="bg-light-pink">View Bouquets</a>
                </div>
                <div>
                    <h2>Your Cart</h2>
                    <a href="/cart" className="bg-medium-pink">Go to Cart</a>
                </div>
                <div>
                    <h2>Go to Shop</h2>
                    <a href="/shop" className="bg-dark-pink">Go to Shop</a>
                </div>
            </div>

            <div className="section">
                <h2>Account Management</h2>
                <a href="/account/edit.html" className="bg-medium-pink">Edit Profile</a>
                <a href="/account/change-password" className="bg-dark-pink">Change Password</a>
            </div>

            <footer>
                &copy; 2024 CPH Petal Studio. <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Service</a>
            </footer>
        </div>
    );
};

export default UserDashboard;