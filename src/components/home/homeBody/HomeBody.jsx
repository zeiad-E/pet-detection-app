import React from 'react';
import { FaPaw, FaCut, FaMobileAlt } from 'react-icons/fa';
import styles from './HomeBodyStyle.module.css';
import img1 from './beforeAiProcessing.png'
import img2 from './afterAiProcessing.png'
const HomeBody = () => {
  return (<>
  <section className={styles.homeContainer}>
    
    <h1>Advanced AI-Powered Features</h1>
    <h5>Cutting-edge technology meets pet detection innovation</h5>
    <div className={styles.cards}>
        <div className={`${styles.card} ${styles.blue}`}>
            <div className={styles.icon}><FaPaw size={28} /></div>
            <h2>Advanced Pet Detection</h2>
            <p>Our YOLOv5-powered AI identifies multiple pet species with 95%+ accuracy in real-time.</p>
        </div>
        <div className={`${styles.card} ${styles.orange}`}>
            <div className={styles.icon}><FaCut size={28} /></div>
            <h2>Real-Time Segmentation</h2>
            <p>DeepLabV3 technology provides precise pet boundaries and detailed segmentation masks.</p>
        </div>
        <div className={`${styles.card} ${styles.green}`}>
            <div className={styles.icon}><FaMobileAlt size={28} /></div>
            <h2>Intuitive Design</h2>
            <p>User-friendly interface designed for pet owners of all technical backgrounds.</p>
        </div>
    </div>
  </section>

  <section className={styles.homeContainer}>
    
    <h1>See AI Detection in Action</h1>
    <h5>Watch how our AI transforms pet photos with intelligent detection</h5>
    <div className={styles.cards}>
      <div className={styles.imgCard}>
        <h2>Before AI Processing</h2>
        <img src={img1} alt="" />
      </div>
      <div className={styles.imgCard}>
        <h2>After AI Processing</h2>
        <img src={img2} alt="" />
      </div>
      
    </div>
  </section>

  <section className={styles.homeContainer}>
    <h1 className={styles.reviewTitle}>What Pet Owners Say</h1>
    <h5 className={styles.reviewSubtitle}>Join thousands of satisfied users</h5>
    <div className={styles.reviewCards}>
      <div className={styles.testimonialCard}>
        <div className={styles.userInfo}>
          <img src="https://randomuser.me/api/portraits/women/1.jpg" alt="Sarah Johnson" className={styles.avatar} />
          <div>
            <strong>Sarah Johnson</strong>
            <p className={styles.userRole}>Dog Owner</p>
          </div>
        </div>
        <p className={styles.testimonial}>
          "Incredible accuracy! The AI detected my rescue dog's breed mix perfectly. This technology is amazing for pet identification."
        </p>
        <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
      </div>

      <div className={styles.testimonialCard}>
        <div className={styles.userInfo}>
          <img src="https://randomuser.me/api/portraits/men/2.jpg" alt="Mike Chen" className={styles.avatar} />
          <div>
            <strong>Mike Chen</strong>
            <p className={styles.userRole}>Cat Enthusiast</p>
          </div>
        </div>
        <p className={styles.testimonial}>
          "As a tech person, I'm impressed by the AI's precision. It even detected my shy cat hiding behind furniture!"
        </p>
        <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
      </div>

      <div className={styles.testimonialCard}>
        <div className={styles.userInfo}>
          <img src="https://randomuser.me/api/portraits/women/3.jpg" alt="Emma Davis" className={styles.avatar} />
          <div>
            <strong>Emma Davis</strong>
            <p className={styles.userRole}>Multi-Pet Owner</p>
          </div>
        </div>
        <p className={styles.testimonial}>
          "Perfect for organizing my pet photos! The AI identifies all three of my pets in group photos with stunning accuracy."
        </p>
        <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
      </div>
    </div>
  </section>

<section className={styles.homeContainer} style={{backgroundColor: '#2563eb' , color : 'white'}}>
<h1>Ready to Experience AI Pet Detection?</h1>
<h5>Join thousands of pet owners using cutting-edge AI technology</h5>

<div className={styles.buttonContainer} >
    <button>Get Started Free</button>
    <button style={{backgroundColor:'transparent',border:'2px solid white'}}>Learn More</button>
</div>
</section>
  
  </>
   
  );
};

export default HomeBody;
