import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Wishlist.css'; // Import CSS for styling

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Fetch wishlist items
    const fetchWishlist = async () => {
      try {
        const response = await axios.get('http://localhost:5004/api/wishlist', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setWishlist(response.data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div className="wishlist-page">
      <header className="wishlist-header">
        <h1>My Wishlist</h1>
      </header>
      <main className="wishlist-content">
        {wishlist.length ? (
          wishlist.map((item) => (
            <div key={item.id} className="wishlist-item">
              <img src={item.image_url} alt={item.name} className="wishlist-image" />
              <h3>{item.name}</h3>
            </div>
          ))
        ) : (
          <p>Your wishlist is empty.</p>
        )}
      </main>
      <footer className="wishlist-footer">
        <p>&copy; 2024 Wanderlist. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Wishlist;
