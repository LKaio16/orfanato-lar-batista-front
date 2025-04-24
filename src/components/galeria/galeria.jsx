import React, { useEffect, useState } from 'react';
import styles from './galeria.module.css';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const GALERIA_ENDPOINT = `${API_BASE_URL}/galeria`;

function Galeria() {
  // Estados
  const [imagens, setImagens] = useState([]);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Carregamento inicial
  const [error, setError] = useState(null); // Mensagens de erro

  // Carrega imagens do backend ao montar o componente
  useEffect(() => {
    carregarImagens();
  }, []);

  // Busca imagens do backend
  const carregarImagens = async () => {
    setIsLoading(true); // Inicia o carregamento
    setError(null); // Limpa erros anteriores

    try {
      const response = await axios.get(GALERIA_ENDPOINT);
      setImagens(response.data);
    } catch (err) {
      console.error('Erro ao carregar galeria:', err);
      setError('Erro ao carregar galeria. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false); // Finaliza o carregamento
    }
  };

  // Fecha a imagem em zoom
  const closeZoom = () => {
    setZoomedImage(null);
  };

  return (
    <div className={styles.galeriaContainer}>
      {/* Mensagens de status */}
      {isLoading && <p>Carregando galeria...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Exibe a galeria se não estiver carregando/com erro e houver imagens */}
      {!isLoading && !error && imagens.length > 0 && (
        <div className={styles.galeriaGrid}>
          {imagens.map(imagem => (
            <div
              key={imagem.id}
              className={styles.galeriaItem}
              onClick={() => setZoomedImage(imagem.url)}
            >
              <img src={imagem.url} alt={`Imagem da galeria ${imagem.id}`} /> {/* Alt text aprimorado */}
            </div>
          ))}
        </div>
      )}

      {/* Mensagem se não houver imagens e não estiver carregando/com erro */}
      {!isLoading && !error && imagens.length === 0 && (
        <p>Nenhuma imagem encontrada na galeria.</p>
      )}


      {/* Overlay para imagem em zoom */}
      {zoomedImage && (
        <div className={styles.zoomOverlay} onClick={closeZoom}>
          <img className={styles.zoomedImage} src={zoomedImage} alt="Imagem ampliada" /> {/* Alt text aprimorado */}
        </div>
      )}
    </div>
  );
}

export default Galeria;
