// client/src/components/Profile.js
import React, { useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [file, setFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAvatarUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/profile/avatar', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log("📸 Avatar Upload Response:", response.data);

      // If server sends back avatar URL
      if (response.data.avatarUrl) {
        setAvatarUrl(response.data.avatarUrl);
      }

      alert("✅ Avatar uploaded successfully!");
    } catch (err) {
      console.error("❌ Error uploading avatar:", err);
      alert("Error uploading avatar");
    }
  };

  return (
    <div>
      <h1>Upload Avatar</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleAvatarUpload}>Upload Avatar</button>

      {avatarUrl && (
        <div>
          <h3>Preview:</h3>
          <img src={avatarUrl} alt="User Avatar" width={150} height={150} style={{ borderRadius: '50%' }} />
        </div>
      )}
    </div>
  );
};

export default Profile;
