import { fetchProfile } from '../services/auth';
import ProtectedRoute from '../components/ProtectedRoute';
import {useEffect, useState} from "react";

interface Profile {
    name: string;
    email: string;
}

const UserProfilePage = () => {
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        const getProfile = async () => {
            try {
                const token = localStorage.getItem('jwt_token');
                if (!token) throw new Error('No token found');
                const data = await fetchProfile(token);
                setProfile(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        getProfile();
    }, []);

    return (
        <ProtectedRoute>
            <div className="container">
                {profile ? (
                    <div>
                        <h2>{profile.name}</h2>
                        <p>Email: {profile.email}</p>
                        {/* Add more profile information here */}
                    </div>
                ) : (
                    <p>Loading profile...</p>
                )}
            </div>
        </ProtectedRoute>
    );
};

export default UserProfilePage;