import React, { useState } from 'react';
import axios from 'axios';
import './DemoStyle.css';

function Demo() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [loading, setLoading] = useState(false); 

  // Handle registration
  const handleRegister = async () => {
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    try {
      await axios.post('http://localhost:3000/register', { username, password });
      setError('Registration successful! Please log in.');
    } catch (err) {
      setError('Registration failed');
      console.error(err);
    }
  };

  // Handle login
  const handleLogin = async () => {
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/login', { username, password });
      const newToken = response.data.token;
      setToken(newToken);
      setIsLoggedIn(true);
      localStorage.setItem('token', newToken); // Store token
      setError(null);
    } catch (err) {
      setError('Login failed');
      console.error(err);
    }
  };

  // Handle logout
  const handleLogout = () => {
    setToken('');
    setIsLoggedIn(false);
    setResult(null);
    localStorage.removeItem('token');
    setError('Logged out successfully');
  };

  // Handle image upload
  const handleUpload = async () => {
    if (!image || !token) {
      setError('Please log in and select an image');
      return;
    }

    setLoading(true); // Start loading
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResult(response.data);
      setError(null);
    } catch (err) {
      setError('Upload failed or unauthorized');
      console.error(err);
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Pet Detection App</h1>
      {!isLoggedIn ? (
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleRegister}>Register</button>
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div>
          <p>Welcome, {username}! <button onClick={handleLogout}>Logout</button></p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button onClick={handleUpload}>Upload Image</button>
          {loading && <p className="loading">Loading...</p>} {/* Loading indicator */}
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && isLoggedIn && (
        <div>
          <h2>Results</h2>
          <p><strong>Classification:</strong> {result.classification}</p>
          {result.detection_image && (
            <div>
              <h3>Detection Image</h3>
              <img
                src={`data:image/png;base64,${result.detection_image}`}
                alt="Detection"
                style={{ maxWidth: '500px' }}
              />
            </div>
          )}
          {result.segmentation_image && (
            <div>
              <h3>Segmentation Image</h3>
              <img
                src={`data:image/png;base64,${result.segmentation_image}`}
                alt="Segmentation"
                style={{ maxWidth: '500px' }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Demo;