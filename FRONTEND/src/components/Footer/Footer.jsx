import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY } from '../../models/contentModel';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        
       
        <p className={styles.copy}>{COMPANY.copyright}</p>
      </div>
    </footer>
  );
}
