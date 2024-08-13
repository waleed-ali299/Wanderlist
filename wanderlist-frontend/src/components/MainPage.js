import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MainPage.css'; // Import CSS for styling

const MainPage = () => {
  return (
    <div className="main-page">
      <header className="main-header">
        <h1>Welcome to Wanderlist!</h1>
        <nav className="main-nav">
          <Link to="/profile">My Profile</Link>
          <Link to="/settings">Settings</Link>
          <Link to="/logout">Logout</Link> {/* Add logout link */}
        </nav>
      </header>
      <main className="main-content">
        <h2>Discover the latest features</h2>
        <p>
          Explore the latest updates, manage your preferences, and find
          everything you need to make the most of your experience.
        </p>
        {/* Add more sections or components as needed */}
      </main>
      <footer className="main-footer">
        <p>&copy; 2024 Wanderlist. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainPage;
