import React, { useState } from 'react';
import axios from 'axios';
import './DemoStyle.css';

function Demo() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleUpload = async () => {
    if (!image) {
      setError('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:3000/upload', formData);
      setResult(response.data);
      setError(null);
    } catch (err) {
      setError('Error processing image');
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Pet Detection App</h1>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button onClick={handleUpload}>Upload Image</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && (
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