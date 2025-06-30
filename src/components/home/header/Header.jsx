import React from 'react';
import styles from './HeaderStyle.module.css';
import heroImage from './headerimage.png'; 
import { NavLink } from 'react-router-dom';
const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Unleash the Power of <span className={styles.highlight}>AI</span> to Detect Your Pets
        </h1>
        <p className={styles.subtitle}>
          Upload a photo, and our advanced AI identifies and highlights pets with precision.
          Experience the future of pet detection technology.
        </p>
        <div className={styles.buttons}>
          <NavLink to='/upload' className={styles.uploadBtn}>
            <span className={styles.icon}>⬆️</span> Upload a Photo
          </NavLink>
          <NavLink to='/demo' className={styles.demoBtn}>Watch Demo</NavLink>
        </div>
      </div>
      <div className={styles.imageContainer}>
        <img src={heroImage} alt="AI detecting pet" className={styles.heroImage} />
      </div>
    </header>
  );
};

export default Header;
