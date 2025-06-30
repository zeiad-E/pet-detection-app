import React from 'react';
import styles from './FooterStyle.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.brand}>
          <h2><FontAwesomeIcon icon={faPaw} className={styles.icon} /> PetDetect AI</h2>
          <p>Advanced AI technology for pet detection and analysis.</p>
        </div>
        <div className={styles.section}>
          <h4>Product</h4>
          <ul>
            <li><a href="#">Features</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">API</a></li>
          </ul>
        </div>
        <div className={styles.section}>
          <h4>Company</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Privacy</a></li>
          </ul>
        </div>
        <div className={styles.section}>
          <h4>Account</h4>
          <ul>
            <li><a href="#">Login</a></li>
            <li><a href="#">Register</a></li>
            <li><a href="#">Support</a></li>
          </ul>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>© 2024 PetDetect AI. All rights reserved.</p>
      </div>
    </footer>
  );
}
