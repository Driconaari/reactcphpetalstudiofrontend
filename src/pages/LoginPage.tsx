import  { useState } from 'react';
import './styles/login.css'; // Import your CSS file

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const login = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            const { token, role } = data;

            // Store the token for future use
            localStorage.setItem('jwt_token', token);

            // Redirect based on user role
            if (role === 'ROLE_ADMIN') {
                window.location.href = '/admin-dashboard';
            } else if (role === 'ROLE_USER') {
                window.location.href = '/user-dashboard';
            } else {
                setMessage('Unknown role!');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="login-container">
            {/* Header Section */}
            <header className="login-header">
                <h1>CPH Petal Studio</h1>
                <p>Your trusted online flower shop</p>
            </header>

            {/* Login Form */}
            <div className="login-form">
                <h2>Welcome Back</h2>
                <p>Please log in to continue to your CPH Petal Studio account.</p>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        login();
                    }}
                >
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="actions">
                        <button type="submit" className="btn">
                            Login
                        </button>
                    </div>
                </form>

                {/* Message Display */}
                {message && <div className={`message ${message.includes('failed') ? 'error' : 'success'}`}>{message}</div>}
            </div>

            {/* Footer Section */}
            <footer className="login-footer">
                &copy; 2024 Flower Haven. <a href="#">Privacy Policy</a>
            </footer>
        </div>
    );
};

export default LoginPage;
