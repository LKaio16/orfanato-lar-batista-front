import React, { useEffect, useState } from "react";
import styles from "./ultimasnoticias.module.css"; // Usaremos este arquivo CSS
import { useNavigate } from "react-router-dom";

const UltimasNoticias = () => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para indicar carregamento
  const [error, setError] = useState(null); // Estado para guardar erros
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/noticias")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro HTTP: ${res.status}`); // Melhora o tratamento de erro
        }
        return res.json();
      })
      .then((data) => {
        // Ordena as notícias pela data mais recente primeiro
        // e pega as 3 primeiras
        const noticiasMaisRecentes = data
          // Certifique-se que a data é válida antes de comparar
          .filter(noticia => !isNaN(new Date(noticia.data).getTime()))
          .sort((a, b) => new Date(b.data) - new Date(a.data))
          .slice(0, 3);
        setNoticias(noticiasMaisRecentes);
        setLoading(false); // Terminou de carregar
      })
      .catch((err) => {
        console.error("Erro ao carregar notícias:", err);
        setError("Não foi possível carregar as notícias."); // Mensagem de erro para o usuário
        setLoading(false); // Terminou de carregar (com erro)
      });
  }, []); // Array de dependências vazio para rodar só na montagem

  // Função para formatar a data para YYYY-MM-DD
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      // Verifica se a data é válida
      if (isNaN(date.getTime())) {
        return 'Data inválida';
      }
      // 'sv-SE' locale convenientemente formata como YYYY-MM-DD
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
        <h3 className={styles.bigTitle}>Ultimas Noticias</h3>

        {/* Exibe mensagem de carregamento */}
        {loading && <p>Carregando notícias...</p>}

        {/* Exibe mensagem de erro */}
        {error && <p className={styles.errorText}>{error}</p>}

        {/* Grid de Notícias (só exibe se não estiver carregando e não houver erro) */}
        {!loading && !error && (
          <div className={styles.cardsContainer}>
            {noticias.map((noticia) => (
              <div key={noticia.id} className={styles.card}>
                {/* Tag Azul */}
                <div className={styles.cardTag}>
                  {/* Usando uma tag fixa ou pegue de noticia.tag se existir */}
                  {noticia.tag || "NOTÍCIA"}
                </div>
                {/* Conteúdo do Card */}
                <h4 className={styles.cardTitle}>{noticia.nome}</h4>
                <p className={styles.cardDate}>{formatDate(noticia.data)}</p>
              </div>
            ))}
          </div>
        )}

        {/* Botão Ver Mais (exibe mesmo se não houver notícias, mas não durante erro/loading inicial) */}
        {!loading && !error && noticias.length > 0 && (
          <button className={styles.verMaisButton} onClick={() => { navigate("/noticias") }}>VER MAIS</button>
        )}
        {/* Opcional: Mostrar botão mesmo sem notícias?
                 {!loading && !error && (
                     <button className={styles.verMaisButton}>VER MAIS</button>
                 )}
                 */}
      </div>
    </section>
  );
};

export default UltimasNoticias;