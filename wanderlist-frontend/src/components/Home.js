import React, { useState } from 'react';
import LoginPopup from './LoginPopup';
import RegisterPopup from './RegisterPopup';
import '../styles/Home.css'
const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="home">
      <h1>Welcome to WanderList</h1>
      <button onClick={() => setShowLogin(true)}>Login</button>
      <button onClick={() => setShowRegister(true)}>Register</button>

      {showLogin && <LoginPopup closePopup={() => setShowLogin(false)} />}
      {showRegister && <RegisterPopup closePopup={() => setShowRegister(false)} />}
    </div>
  );
};

export default Home;
