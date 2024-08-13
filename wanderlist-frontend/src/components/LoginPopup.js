import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const LoginPopup = ({ closePopup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5004/api/users/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token); // Store JWT token
      closePopup();
      navigate('/mainpage'); // Redirect after login
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Login</button>
          <button type="button" onClick={closePopup}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;
