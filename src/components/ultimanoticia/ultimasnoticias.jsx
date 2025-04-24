import React, { useEffect, useState } from "react";
import styles from "./ultimasnoticias.module.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const NOTICIAS_ENDPOINT = `${API_BASE_URL}/noticias`;

const UltimasNoticias = () => {
  // Estados
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true); // Indica carregamento
  const [error, setError] = useState(null); // Guarda erros

  const navigate = useNavigate();

  // Busca e processa as últimas notícias ao montar o componente
  useEffect(() => {
    const fetchUltimasNoticias = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(NOTICIAS_ENDPOINT);

        // Ordena as notícias pela data mais recente e pega as 3 primeiras
        const noticiasMaisRecentes = response.data
          .filter(noticia => !isNaN(new Date(noticia.data).getTime()))
          .sort((a, b) => new Date(b.data) - new Date(a.data))
          .slice(0, 3);

        setNoticias(noticiasMaisRecentes);

      } catch (err) {
        console.error("Erro ao carregar notícias:", err);
        if (err.response?.data?.message) {
          setError(`Erro: ${err.response.data.message}`);
        } else {
          setError("Não foi possível carregar as últimas notícias.");
        }
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchUltimasNoticias();

  }, []);

  // Função para formatar a data para YYYY-MM-DD
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Data inválida';
      }
      // 'sv-SE' locale formata como YYYY-MM-DD
      return date.toLocaleDateString('sv-SE');
    } catch (e) {
      console.error("Erro ao formatar data:", e);
      return 'Data inválida';
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Títulos */}
        <h2 className={styles.smallTitle}>NOS CONHEÇA</h2>
        <h3 className={styles.bigTitle}>Últimas Notícias</h3> {/* Título ajustado */}

        {/* Exibe mensagem de carregamento */}
        {loading && <p>Carregando notícias...</p>}

        {/* Exibe mensagem de erro */}
        {error && <p className={styles.errorText}>{error}</p>}

        {/* Grid de Notícias (só exibe se não estiver carregando e não houver erro) */}
        {!loading && !error && noticias.length > 0 && (
          <div className={styles.cardsContainer}>
            {noticias.map((noticia) => (
              <div key={noticia.id} className={styles.card}>
                {/* Tag Azul (usando valor fixo ou de noticia.tag) */}
                <div className={styles.cardTag}>
                  {noticia.tag || "NOTÍCIA"}
                </div>
                {/* Conteúdo do Card */}
                <h4 className={styles.cardTitle}>{noticia.nome}</h4> {/* Usar noticia.nome */}
                <p className={styles.cardDate}>{formatDate(noticia.data)}</p>
              </div>
            ))}
          </div>
        )}

        {/* Mensagem se não houver notícias e não estiver carregando/com erro */}
        {!loading && !error && noticias.length === 0 && (
          <p>Nenhuma notícia encontrada.</p>
        )}


        {/* Botão Ver Mais (exibe se não estiver carregando/com erro e houver notícias) */}
        {!loading && !error && noticias.length > 0 && (
          <button className={styles.verMaisButton} onClick={() => { navigate("/noticias") }}>VER MAIS</button>
        )}
      </div>
    </section>
  );
};

export default UltimasNoticias;
