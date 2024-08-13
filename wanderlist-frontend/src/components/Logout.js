import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear any authentication tokens or user data
    localStorage.removeItem('token'); // Assuming you store token in localStorage

    // Redirect to login page or main page
    navigate('/');
  }, [navigate]);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;
