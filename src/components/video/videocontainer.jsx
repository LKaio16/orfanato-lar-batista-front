import React from 'react';
import styles from './videocontainer.module.css';

const VideoContainer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.videoWrapper}>
        <iframe
          src="" 
          title="Video Lar Batista"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoContainer;
