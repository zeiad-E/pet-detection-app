import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import styles from './NavBar.module.css';

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleStorage = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);







  const [image, setImage] = useState(null);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [loading, setLoading] = useState(false); 


     // Handle logout
  const handleLogout = () => {
    setToken('');
    setIsLoggedIn(false);
    setResult(null);
    localStorage.removeItem('token');
    setError('Logged out successfully');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <FontAwesomeIcon icon={faPaw} className={styles.logoIcon} />
        <span className={styles.brandText}>PetDetect AI</span>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : undefined)}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => (isActive ? styles.active : undefined)}>
            About Us
          </NavLink>
        </li>
        <li>
          <NavLink to="/upload" className={({ isActive }) => (isActive ? styles.active : undefined)}>
            Upload
          </NavLink>
        </li>
      </ul>
      <div className={styles.status}>
        <span className={`${styles.dot} ${isLoggedIn ? styles.green : styles.red}`}></span>
        {isLoggedIn ? 'Logged In' : 'Guest'}
      </div>
      <div>
      <button onClick={handleLogout} className={styles.loginBtn} style={{fontSize:'1.2rem',display:!isLoggedIn ? 'none' : 'inline-block'}}>
        Logout
      </button>
        <NavLink to="/login" className={styles.loginBtn} style={{display:isLoggedIn ? 'none' : 'inline-block'}}>
        Login
      </NavLink>
      <NavLink to="/signup" className={styles.loginBtn} style={{backgroundColor:'white',color:'black',boxShadow:'none',border:'1px solid #3b82f6'}}>
        Sign Up
      </NavLink>
      </div>
    </nav>
  );
}
