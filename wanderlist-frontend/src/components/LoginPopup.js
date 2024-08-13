import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const LoginPopup = ({ closePopup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state
    setError(''); // Clear previous errors
  
    try {
      const response = await axios.post('http://localhost:5004/api/users/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token); // Store JWT token
      localStorage.setItem('username', response.data.user.username); // Store username
      closePopup();
      navigate('/mainpage'); // Redirect after login
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid email or password');
    } finally {
      setLoading(false); // Reset loading state
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
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <button type="button" onClick={closePopup}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;
