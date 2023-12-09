import React, { useState } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';
import './Login.css'; 
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const { setUser } = useUser(); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/login', credentials);
            console.log(response.data);
            setUser({ username: response.data.username });
            console.log('User set in context:', { username: response.data.username });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            // Redirect to the home page
            navigate('/');
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Login failed. User may not exist.');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    placeholder="Username"
                />
                <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="Password"
                />
                <button type="submit">Login</button>
                {error && <div className="error-message">{error}</div>}
                <Link to="/CreateUser" className="create-user-link">Create New User</Link>
            </form>
        </div>
    );
};

export default Login;
