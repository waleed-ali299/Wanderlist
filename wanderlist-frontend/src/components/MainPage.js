import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/MainPage.css'; // Import CSS for styling

const MainPage = () => {
  const [continents, setContinents] = useState([]);
  const [wishlist, setWishlist] = useState(new Set());
  const [isWishlistVisible, setIsWishlistVisible] = useState(false);
  const [wishlistCountries, setWishlistCountries] = useState([]);
  const [username, setUsername] = useState(''); // State to hold username

  useEffect(() => {
    // Fetch username from local storage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      console.error('Username not found in local storage.');
    }

    const fetchDestinations = async () => {
      try {
        const response = await axios.get('http://localhost:5004/api/countries', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log('Fetched data:', response.data); // Debugging fetched data
        setContinents(response.data);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    };
  
    fetchDestinations();
  }, []);

  const handleAddToWishlist = async (countryId) => {
    try {
      await axios.post('http://localhost:5004/api/wishlist', { countryId }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setWishlist(prev => new Set(prev).add(countryId));
      alert('Added to wishlist');
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      alert('Failed to add to wishlist');
    }
  };

  const handleViewWishlist = async () => {
    try {
      const response = await axios.get('http://localhost:5004/api/wishlist', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setWishlistCountries(response.data);
      setIsWishlistVisible(true);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  return (
    <div className="main-page">
      <header className="main-header">
        <h1>Explore Destinations</h1>
        {username && <h2>Welcome, {username}!</h2>} {/* Display username */}
        <nav className="main-nav">
          <Link to="/profile">My Profile</Link>
          <Link to="/settings">Settings</Link>
          <Link to="#" onClick={handleViewWishlist}>View Wishlist</Link>
          <Link to="/logout">Logout</Link>
        </nav>
      </header>
      <main className="main-content">
        {isWishlistVisible ? (
          <div className="wishlist">
            <h3>My Wishlist</h3>
            <div className="countries">
              {wishlistCountries.length ? (
                wishlistCountries.map((country) => (
                  <div key={country.id} className="country-card">
                    <img src={country.image_url} alt={country.name} className="country-image" />
                    <h4>{country.name}</h4>
                  </div>
                ))
              ) : (
                <p>Your wishlist is empty.</p>
              )}
            </div>
          </div>
        ) : (
          continents.length ? (
            continents.map((continent) => (
              <section key={continent.id} className="continent">
                <h3>{continent.name}</h3>
                <div className="countries">
                  {continent.countries && continent.countries.length ? (
                    continent.countries.map((country) => (
                      <div key={country.id} className="country-card">
                        <img src={country.image_url} alt={country.name} className="country-image" />
                        <h4>{country.name}</h4>
                        <button
                          onClick={() => handleAddToWishlist(country.id)}
                          disabled={wishlist.has(country.id)}
                        >
                          {wishlist.has(country.id) ? 'In Wishlist' : 'Add to Wishlist'}
                        </button>
                      </div>
                    ))
                  ) : (
                    <p>No countries available in this continent.</p>
                  )}
                </div>
              </section>
            ))
          ) : (
            <p>Loading destinations...</p>
          )
        )}
      </main>
      <footer className="main-footer">
        <p>&copy; 2024 Wanderlist. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainPage;
