import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface UserProfile {
    username: string;
    email: string;
    createdAt: string;
}

const Container = styled.div`
  font-family: 'Lato', sans-serif;
  background-color: #fff5f7;
  color: #333;
  line-height: 1.6;
  margin: 0;
  padding: 20px;
`;

const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 2.8rem;
  margin-bottom: 30px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #333;
`;

const Section = styled.div`
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
`;

const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: #333;
`;

const Grid = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 12px 18px;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 50px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.05);
  }

  &.bg-light-pink {
    background-color: #ffadc6;
    &:hover {
      background-color: #ff90ae;
    }
  }

  &.bg-medium-pink {
    background-color: #ff6f91;
    &:hover {
      background-color: #ff4f73;
    }
  }

  &.bg-dark-pink {
    background-color: #d95573;
    &:hover {
      background-color: #c04062;
    }
  }
`;

const Footer = styled.footer`
  background-color: #fff;
  color: #333;
  font-size: 0.9rem;
  border-top: 1px solid #ddd;
  padding: 20px 0;
  text-align: center;

  a {
    color: #ff6f91;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      color: #ff4f73;
    }
  }
`;

const UserDashboard: React.FC = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/user/profile', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
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
        <Container>
            <Title>Welcome</Title>

            <Section>
                <SectionTitle>Your Account Information</SectionTitle>
                <p><strong>Username:</strong> {profile?.username || 'N/A'}</p>
                <p><strong>Email:</strong> {profile?.email || 'N/A'}</p>
                <p><strong>Account Created:</strong> {profile ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}</p>
                <Button to="/logout" className="bg-dark-pink">Logout</Button>
            </Section>

            <Grid>
                <Section>
                    <SectionTitle>Browse Bouquets</SectionTitle>
                    <p>Explore our beautiful selection of bouquets.</p>
                    <Button to="/bouquets/list" className="bg-light-pink">View Bouquets</Button>
                </Section>

                <Section>
                    <SectionTitle>Your Cart</SectionTitle>
                    <p>View and manage items in your cart.</p>
                    <Button to="/cart" className="bg-medium-pink">Go to Cart</Button>
                </Section>

                <Section>
                    <SectionTitle>Go to Shop</SectionTitle>
                    <p>Visit our main shop page to see all products.</p>
                    <Button to="/shop" className="bg-dark-pink">Go to Shop</Button>
                </Section>
            </Grid>

            <Section>
                <SectionTitle>Account Management</SectionTitle>
                <Button to="/account/edit" className="bg-medium-pink">Edit Profile</Button>
                <Button to="/account/change-password" className="bg-dark-pink">Change Password</Button>
            </Section>

            <Footer>
                &copy; 2024 CPH Petal Studio. <Link to="/privacy">Privacy Policy</Link> | <Link to="/terms">Terms of Service</Link>
            </Footer>
        </Container>
    );
};

export default UserDashboard;

