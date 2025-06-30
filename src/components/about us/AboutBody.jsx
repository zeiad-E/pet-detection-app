import React from 'react';
import styles from './AboutBodyStyle.module.css';
import { FaHeart, FaPaw, FaStar } from 'react-icons/fa';

const teamMembers = [
  {
    name: "Dr. Alex Chen",
    role: "AI Research Lead",
    description: "PhD in Computer Vision. 10+ years in machine learning and pet behavior analysis.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    description: "Former veterinary startup tech entrepreneur, passionate about pet welfare.",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Mike Rodriguez",
    role: "Lead Engineer",
    description: "Full-stack developer specializing in AI deployment and scalable architectures.",
    avatar: "https://randomuser.me/api/portraits/men/85.jpg",
  },
];

const AboutBody = () => {
  return (
    <div className={styles.container}>
      <section className={styles.aboutSection}>
        <h2 className={styles.title}>
          About <span className={styles.highlight}>PetDetect AI</span>
        </h2>
        <p className={styles.subtitle}>
          Pioneering the future of pet technology through advanced artificial intelligence and deep learning
        </p>
      </section>

      <section className={styles.missionSection}>
        <h3 className={styles.missionTitle}>Our Mission</h3>
        <div className={styles.missionCard}>
          <p>
            We're dedicated to enhancing pet experiences through cutting-edge AI technology. Our mission is to bridge the gap
            between artificial intelligence and pet care, creating innovative solutions that help pet owners better understand,
            protect, and care for their beloved companions.
          </p>
          <div className={styles.icons}>
            <FaHeart className={styles.icon} />
            <FaStar className={styles.icon} />
            <FaPaw className={styles.icon} />
          </div>
        </div>
      </section>

      <section className={styles.aiSection}>
        <h4 className={styles.aiTitle}>Powered by Advanced AI</h4>
        <p className={styles.aiSubtitle}>
          Our platform leverages state-of-the-art machine learning models to deliver precise pet detection and analysis.
        </p>
        <div className={styles.cards}>
          <div className={styles.card}>
            <h5>YOLOv5 Detection</h5>
            <p>
              Real-time object detection with industry-leading accuracy for identifying pets in any environment.
            </p>
          </div>
          <div className={styles.card}>
            <h5>DeepLabV3 Segmentation</h5>
            <p>
              Precise pixel-level segmentation for detailed pet analysis and feature extraction.
            </p>
          </div>
          <div className={styles.card}>
            <h5>Edge Computing</h5>
            <p>
              Lightning-fast processing with optimized models that work seamlessly across all devices.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.teamSection}>
        <h3 className={styles.teamTitle}>Meet Our Team</h3>
        <p className={styles.teamSubtitle}>
          A passionate group of AI researchers, engineers, and pet enthusiasts working together to revolutionize pet technology.
        </p>
        <div className={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <div key={index} className={styles.teamMember}>
              <img src={member.avatar} alt={member.name} className={styles.avatar} />
              <h4>{member.name}</h4>
              <p className={styles.role}>{member.role}</p>
              <p>{member.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.contactSection}>
        <h3 className={styles.contactTitle}>Get In Touch</h3>
        <p className={styles.contactSubtitle}>
          Have questions about our AI technology or interested in partnerships? We'd love to hear from you.
        </p>
        <form className={styles.contactForm}>
          <div className={styles.row}>
            <input type="text" placeholder="Enter your name" required />
            <input type="email" placeholder="Enter your email" required />
          </div>
          <div className={styles.row}>
            <select required>
              <option>General Inquiry</option>
              <option>Partnership</option>
              <option>Support</option>
            </select>
          </div>
          <textarea placeholder="Tell us about your inquiry..." rows="4" required />
          <button type="submit">Send Message</button>
        </form>
      </section>
    </div>
  );
};

export default AboutBody;
