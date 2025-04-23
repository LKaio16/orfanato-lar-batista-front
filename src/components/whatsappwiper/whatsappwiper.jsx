import React from 'react';
import styles from './whatsappwiper.module.css';

const WhatsAppWiper = () => {
  const phoneNumber = "551132083074";

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.whatsappButton}
    >
      <img src="/assets/WhatsApp.png" alt="WhatsApp" className={styles.whatsappIcon} />
    </a>
  );
};

export default WhatsAppWiper;
