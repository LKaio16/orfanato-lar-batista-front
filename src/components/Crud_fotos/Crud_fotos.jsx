import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Crud_fotos.module.css';

const API_URL = 'http://localhost:8080/api/galeria';

export default function AdicionarFotos() {
  const [fotos, setFotos] = useState([]);
  const [novaUrl, setNovaUrl] = useState("");
  const [arquivo, setArquivo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchFotos();
  }, []);

  const fetchFotos = async () => {
    try {
      const response = await axios.get(API_URL);
      setFotos(response.data);
    } catch (error) {
      console.error('Erro ao buscar fotos:', error);
    }
  };

  const handleArquivoChange = (e) => {
    setArquivo(e.target.files[0]);
  };

  const adicionarFoto = async () => {
    setIsLoading(true);
    try {
      let base64Url = novaUrl;

      if (arquivo) {
        base64Url = await converterArquivoParaBase64(arquivo);
      }

      if (!base64Url) return;

      await axios.post(API_URL, { url: base64Url });

      setNovaUrl("");
      setArquivo(null);
      await fetchFotos();
    } catch (error) {
      console.error('Erro ao adicionar foto:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const converterArquivoParaBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const leitor = new FileReader();
      leitor.readAsDataURL(file);
      leitor.onload = () => resolve(leitor.result);
      leitor.onerror = (error) => reject(error);
    });
  };

  const deletarFoto = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchFotos();
    } catch (error) {
      console.error('Erro ao deletar foto:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>📸 Galeria 📸 </h2>

      <div className={styles.inputArea}>
        <input
          type="text"
          placeholder="Ou cole uma URL base64 da imagem"
          value={novaUrl}
          onChange={(e) => setNovaUrl(e.target.value)}
        />
        <span className={styles.ou}>ou</span>
        <input type="file" accept="image/*" onChange={handleArquivoChange} />
        <button
          onClick={adicionarFoto}
          disabled={isLoading}
        >
          {isLoading ? 'Enviando...' : 'Adicionar Foto'}
        </button>
      </div>

      {fotos.length === 0 ? (
        <p className={styles.aviso}>Nenhuma foto cadastrada ainda.</p>
      ) : (
        <div className={styles.galeria}>
          {fotos.map((foto) => (
            <div key={foto.id} className={styles.card}>
              <img
                src={foto.url}
                alt={`Foto ${foto.id}`}
                className={styles.imagem}
              />
              <button
                className={styles.btnExcluir}
                onClick={() => deletarFoto(foto.id)}
              >
                ❌ Remover
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}