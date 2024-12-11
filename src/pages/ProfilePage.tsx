import { useState, useEffect } from 'react';
import { fetchProfile } from '../services/auth';  // Import fetchProfile service
import './styles/ProfilePage.css';  // Import styles

interface Profile {
  username: string;
  email: string;
  // Add other profile fields as needed
}

const ProfilePage = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const profileData = await fetchProfile(); // Call the service to fetch profile
        setProfile(profileData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
      }
    };

    getProfileData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>Error fetching profile.</div>;
  }

  return (
      <div className="profile-container">
        <h2 className="profile-header">Your Profile</h2>
        <p className="profile-detail">Username: {profile.username}</p>
        <p className="profile-detail">Email: {profile.email}</p>
        {/* Render other profile details as needed */}
      </div>
  );
};

export default ProfilePage;