import { useEffect, useState } from 'react';
import { fetchProfile } from '../services/auth';  // Import fetchProfile service
import ProtectedRoute from '../components/ProtectedRoute';  // ProtectedRoute to ensure user is authenticated

interface Profile {
    name: string;
    email: string;
}

const UserProfilePage = () => {
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        const getProfile = async () => {
            try {
                const data = await fetchProfile();  // Fetch user profile
                setProfile(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        getProfile();
    }, []);

    return (
        <ProtectedRoute>  {/* Protect profile page from unauthorized access */}
            <div className="container">
                {profile ? (
                    <div>
                        <h2>{profile.name}</h2>
                        <p>Email: {profile.email}</p>
                        {/* Render other profile information here */}
                    </div>
                ) : (
                    <p>Loading profile...</p>
                )}
            </div>
        </ProtectedRoute>
    );
};

export default UserProfilePage;
