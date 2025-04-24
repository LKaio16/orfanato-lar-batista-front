import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Crud_fotos.module.css';

// URL base da API usando variável de ambiente com fallback
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
// Endpoint específico para galeria
const GALERIA_ENDPOINT = `${API_BASE_URL}/galeria`;

export default function AdicionarFotos() {
  // Estados
  const [fotos, setFotos] = useState([]);
  const [novaUrl, setNovaUrl] = useState("");
  const [arquivo, setArquivo] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Operação adicionar/deletar
  const [isFetching, setIsFetching] = useState(true); // Carregamento inicial da lista
  const [error, setError] = useState(null); // Mensagens de erro

  // Carrega fotos ao montar
  useEffect(() => {
    fetchFotos();
  }, []);

  // Busca fotos do backend
  const fetchFotos = async () => {
    setIsFetching(true);
    setError(null);

    try {
      const response = await axios.get(GALERIA_ENDPOINT);
      setFotos(response.data);
    } catch (err) {
      console.error('Erro ao buscar fotos:', err);
      setError('Erro ao carregar fotos. Tente novamente mais tarde.');
    } finally {
      setIsFetching(false);
    }
  };

  // Lida com seleção de arquivo
  const handleArquivoChange = (e) => {
    setArquivo(e.target.files[0]);
    setNovaUrl(""); // Limpa URL ao selecionar arquivo
    setError(null);
  };

  // Adiciona foto (URL ou arquivo)
  const adicionarFoto = async () => {
    setIsLoading(true);
    setError(null);

    try {
      let base64Url = novaUrl;

      if (arquivo) {
        base64Url = await converterArquivoParaBase64(arquivo);
      }

      if (!base64Url) {
        setError('Por favor, insira uma URL ou selecione um arquivo.');
        setIsLoading(false);
        return;
      }

      await axios.post(GALERIA_ENDPOINT, { url: base64Url });

      setNovaUrl("");
      setArquivo(null);
      fetchFotos(); // Recarrega lista
      // Opcional: Mostrar mensagem de sucesso
    } catch (err) {
      console.error('Erro ao adicionar foto:', err);
      if (err.response?.data?.message) {
        setError(`Erro ao adicionar: ${err.response.data.message}`);
      } else {
        setError('Erro ao adicionar foto. Verifique os dados e tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Converte File para Base64
  const converterArquivoParaBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const leitor = new FileReader();
      leitor.readAsDataURL(file);
      leitor.onload = () => resolve(leitor.result);
      leitor.onerror = (error) => reject(error);
    });
  };

  // Deleta foto por ID
  const deletarFoto = async (id) => {
    if (!window.confirm('Tem certeza que deseja remover esta foto?')) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await axios.delete(`${GALERIA_ENDPOINT}/${id}`);
      setFotos(fotos.filter((foto) => foto.id !== id)); // Atualiza lista localmente
      // Opcional: Mostrar mensagem de sucesso
    } catch (err) {
      console.error('Erro ao deletar foto:', err);
      if (err.response?.data?.message) {
        setError(`Erro ao remover: ${err.response.data.message}`);
      } else {
        setError('Erro ao deletar foto. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>📸 Galeria 📸 </h2>

      {/* Mensagens de status */}
      {isFetching && <p>Carregando fotos...</p>}
      {isLoading && <p>Processando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* Opcional: Mensagem de sucesso */}
      {/* {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} */}

      <div className={styles.inputArea}>
        <input
          type="text"
          placeholder="Ou cole uma URL base64 da imagem"
          value={novaUrl}
          onChange={(e) => { setNovaUrl(e.target.value); setArquivo(null); setError(null); }}
          disabled={isLoading || isFetching}
        />
        <span className={styles.ou}>ou</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleArquivoChange}
          disabled={isLoading || isFetching}
        />
        <button
          onClick={adicionarFoto}
          disabled={isLoading || isFetching || (!novaUrl && !arquivo)}
        >
          {isLoading ? 'Enviando...' : 'Adicionar Foto'}
        </button>
      </div>

      {/* Exibe a lista ou mensagem de aviso */}
      {isFetching ? (
        null // Mensagem de loading já exibida
      ) : error ? (
        null // Mensagem de erro já exibida
      ) : fotos.length === 0 ? (
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
                disabled={isLoading || isFetching}
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
