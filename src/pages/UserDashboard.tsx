import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface UserProfile {
    username: string;
    email: string;
}

const UserDashboard: React.FC = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/user/profile', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch profile');
                }
                const data = await response.json();
                setProfile(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div>
            <h2>Welcome, {profile?.username}</h2>
            <p>Email: {profile?.email}</p>
            <Link to="/shop">Go to Shop</Link>
        </div>
    );
};

export default UserDashboard;

