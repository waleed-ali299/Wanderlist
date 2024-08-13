import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Travel.css'; // Import CSS for styling

const Travel = () => {
  const [destinations, setDestinations] = useState([]);
  
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get('http://localhost:5004/api/destinations');
        setDestinations(response.data);
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
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Added to wishlist');
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      alert('Failed to add to wishlist');
    }
  };

  return (
    <div className="travel-page">
      <h1>Travel Destinations</h1>
      {destinations.map(continent => (
        <div key={continent.id} className="continent">
          <h2>{continent.name}</h2>
          <div className="countries">
            {continent.Countries.map(country => (
              <div key={country.id} className="country-card">
                <img src={country.image_url} alt={country.name} className="country-image" />
                <p>{country.name}</p>
                <button onClick={() => handleAddToWishlist(country.id)}>Add to Wishlist</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Travel;
