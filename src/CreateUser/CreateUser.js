import React, { useState } from 'react';
import axios from 'axios';
import './CreateUser.css'; // Import CSS file for styling
import { Link } from 'react-router-dom';

const CreateUser = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/users', user);
            console.log(response.data);
            // Handle post-creation logic (e.g., redirect to login page)
            <Link to="/LogIn" className="create-user-link">Create New User</Link>
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <div className="create-user-container">
            <form onSubmit={handleSubmit} className="create-user-form">
                <h2>Create User</h2>
                <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    placeholder="Username"
                />
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    placeholder="Password"
                />
                <button type="submit">Create User</button>
            </form>
        </div>
    );
};

export default CreateUser;
