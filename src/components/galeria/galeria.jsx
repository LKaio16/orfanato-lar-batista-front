import React, { useEffect, useState } from 'react';
import styles from './Galeria.module.css';
import axios from 'axios';

function Galeria() {
  const [imagens, setImagens] = useState([]);
  const [zoomedImage, setZoomedImage] = useState(null);

  useEffect(() => {
    const carregarImagens = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/galeria');
        setImagens(response.data);
      } catch (error) {
        console.error('Erro ao carregar galeria:', error);
      }
    };
    carregarImagens();
  }, []);

  return (
    <div className={styles.galeriaContainer}>
      <div className={styles.galeriaGrid}>
        {imagens.map(imagem => (
          <div
            key={imagem.id}
            className={styles.galeriaItem}
            onClick={() => setZoomedImage(imagem.url)}
          >
            <img src={imagem.url} alt="Imagem da galeria" />
          </div>
        ))}
      </div>

      {zoomedImage && (
        <div className={styles.zoomOverlay} onClick={() => setZoomedImage(null)}>
          <img className={styles.zoomedImage} src={zoomedImage} alt="Zoom" />
        </div>
      )}
    </div>
  );
}

export default Galeria;