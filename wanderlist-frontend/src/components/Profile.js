import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Profile.css'; // Import CSS for styling

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  // Fetch user details from API
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get('http://localhost:5004/api/users/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handlePhotoUpload = async () => {
    if (!profilePhoto) {
      alert('Please select a photo to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('profilePhoto', profilePhoto);

    try {
      const response = await axios.post('http://localhost:5004/api/users/upload-photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Profile photo updated successfully.');
      // Re-fetch user data to update the profile photo URL
      fetchUserDetails();
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Failed to upload photo. Please try again later.');
    }
  };

  return (
    <div className="profile-page">
      <header className="profile-header">
        <h1>Profile</h1>
      </header>
      <main className="profile-content">
        {user ? (
          <div className="profile-details">
            <div className="profile-photo">
              <img
                src={photoPreview || user.profilePhotoUrl || 'default-avatar.png'}
                alt="Profile"
                className="profile-photo-img"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
              />
              <button onClick={handlePhotoUpload}>Upload Photo</button>
            </div>
            <div className="user-info">
              <p><strong>Name:</strong> {user.username || user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Joined:</strong> {new Date(user.created_at || user.joinedAt).toLocaleDateString()}</p>
              {/* Add more user details as needed */}
            </div>
          </div>
        ) : (
          <p>Loading user details...</p>
        )}
      </main>
    </div>
  );
};

export default Profile;
