import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Logout from './components/Logout';
import MainPage from './components/MainPage';
import Profile from './components/Profile'; // Import the Profile component
import Wishlist from './components/Wishlist';
const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" component={Wishlist} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
