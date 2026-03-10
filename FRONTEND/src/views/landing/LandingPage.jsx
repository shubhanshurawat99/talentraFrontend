// ─────────────────────────────────────────────────────────
// VIEW: LandingPage.jsx
// Role selector screen — no auth, just choose your path.
// ─────────────────────────────────────────────────────────

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { COMPANY } from '../../models/contentModel';
import styles from './LandingPage.module.css';
import logo from '../../asset/logo.png';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      {/* Background orbs */}
      <div className={styles.bg}>
        <span className={styles.orb1}></span>
        <span className={styles.orb2}></span>
        <span className={styles.orb3}></span>
      </div>
      <div className={styles.grid}></div>

      <div className={styles.content}>
        <div className={styles.header}>
           <div className={styles.logoContainer}>
          <img 
            src={logo} 
            alt="Company Logo" 
            className={styles.logoCircle}
          />
          <h1 className={styles.logo}>
            Talen<span>tra</span>
          </h1>
        </div>
        <div className={styles.eyebrow}>
          <span className={styles.line}></span>
          Consultancy
          <span className={styles.line}></span>
        </div>

        <p className={styles.tagline}>{COMPANY.tagline}</p>

        </div>
       

        <div className={styles.cards}>
          {/* Employer Card */}
          <button className={styles.card} onClick={() => navigate('/employer')} aria-label="I'm an Employer">
            <div className={styles.cardIcon}>🏢</div>
            <h3>I'm an Employer</h3>
            <p>Find top talent for your team. Tell us your hiring needs and we'll do the rest.</p>
            <div className={styles.arrow}>→</div>
          </button>

          {/* Candidate Card */}
          <button className={styles.card} onClick={() => navigate('/candidate')} aria-label="I'm a Candidate">
            <div className={styles.cardIcon}>👤</div>
            <h3>I'm a Candidate</h3>
            <p>Take the next step in your career. Submit your profile and get discovered.</p>
            <div className={styles.arrow}>→</div>
          </button>
        </div>
      </div>
    </div>
   
  );
}
