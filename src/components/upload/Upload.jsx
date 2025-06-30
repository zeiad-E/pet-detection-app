import React, { useState } from 'react';
import axios from 'axios';
import styles from './UploadStyle.module.css';
import { FaUpload } from 'react-icons/fa';

const Upload = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  
  const [selectedImage, setSelectedImage] = useState(null);

  // Handle image upload
  const handleUpload = async () => {
    if (!image) {
      setError('Please select an image');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResult(response.data);
      // setSelectedImage(URL.createObjectURL(image));
      setError(null);
    } catch (err) {
      setError('Upload failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.uploadContainer}>
      <div className={styles.header}>
        <FaUpload size={32} className={styles.uploadIcon} />
        <h2>Upload Your Pet Image</h2>
        <p>
          Select an image to detect and analyze your pets using our advanced AI technology
        </p>
      </div>

      <div className={styles.dropZone}>
        <div className={styles.dropInner}>
          <FaUpload size={24} className={styles.cloudIcon} />
          <p className={styles.dropText}>
            Drop your image here, or click to browse
          </p>
          <p className={styles.supportText}>Supports JPG, PNG, WEBP up to 10MB</p>
          <label htmlFor="fileUpload" className={styles.uploadButton}>
            <input
              type="file"
              id="fileUpload"
              hidden
              accept="image/*"
              onChange={(e) => {
                setImage(e.target.files[0]);
                setSelectedImage(URL.createObjectURL(e.target.files[0]));
              }}
            />
            <span>📁 Choose File</span>
          </label>
        </div>
      </div>

      {/* Upload button and status */}
      {error && <p className={styles.errorMessage}>{error}</p>}
      <button
        onClick={handleUpload}
        className={styles.uploadButton}
        disabled={loading}
        style={{ marginTop: '1rem' }}
      >
        {loading ? 'Uploading...' : 'Upload Image'}
      </button>
      {loading && <p className={styles.loading}>Processing image...</p>}
      {selectedImage && (
        <div className={styles.imageWrapper}>
          <h3>Original Image</h3>
          <img src={selectedImage} alt="Original" className={styles.previewImage} style={{maxWidth:'300px'}} />
        </div>
      )}
      {result && (
        <div>
          <h2>Results</h2>
          <p><strong>Classification:</strong> {result.classification}</p>
          {result.detection_image && (
            <div className={styles.imageWrapper}>
              <h3>Detection Image</h3>
              <img
                src={`data:image/png;base64,${result.detection_image}`}
                alt="Detection"
                className={styles.previewImage}
                style={{maxWidth:'300px'}}
              />
            </div>
          )}
          {result.segmentation_image && (
            <div className={styles.imageWrapper}>
              <h3>Segmentation Image</h3>
              <img
                src={`data:image/png;base64,${result.segmentation_image}`}
                alt="Segmentation"
                className={styles.previewImage}
                style={{maxWidth:'300px'}}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Upload;