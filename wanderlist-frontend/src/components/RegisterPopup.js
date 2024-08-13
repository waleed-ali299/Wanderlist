import React, { useState } from 'react';
import axios from 'axios';

const RegisterPopup = ({ closePopup }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5004/api/users/register', {
        username,
        email,
        password,
      });
      closePopup();
    } catch (error) {
      setError('Error registering user');
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
          <button type="submit">Register</button>
          <button type="button" onClick={closePopup}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPopup;
