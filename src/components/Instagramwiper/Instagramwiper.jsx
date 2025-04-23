import React from 'react';
import styles from './Instagramwiper.module.css';

const InstagramWiper = () => {
  const instagramUrl = "https://www.instagram.com/casalarbatista/";

  return (
    <a
      href={instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.instagramButton}
    >
      <img src="/assets/instagram.png" alt="instagram" className={styles.instagramIcon} />
    </a>
  );
};

export default InstagramWiper;
