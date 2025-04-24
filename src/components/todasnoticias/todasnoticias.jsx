import React, { useEffect, useState } from 'react';
import styles from './todasnoticias.module.css';
import BoxNoticia from '../boxnoticia/BoxNoticia.jsx';
import { useIdioma } from '../../context/IdiomaContext';
import traducoes from '../../translations/traducoes';
import axios from 'axios';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const NOTICIAS_ENDPOINT = `${API_BASE_URL}/noticias`;

function TodasNoticias() {
  const { idioma } = useIdioma();
  const t = traducoes[idioma];

  // Estados
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carregamento inicial
  const [error, setError] = useState(null); // Mensagens de erro

  // Carrega notícias do backend ao montar o componente ou mudar idioma/traduções
  useEffect(() => {
    const fetchNoticias = async () => {
      setLoading(true);
      setError(null);

      try {
        // Usar axios para a requisição GET
        const response = await axios.get(NOTICIAS_ENDPOINT);

        // axios lança erro para status != 2xx, então a verificação !response.ok não é necessária aqui
        setNoticias(response.data);

      } catch (err) {
        console.error('Erro ao buscar notícias:', err);
        // Usar a mensagem de erro da API ou a mensagem padrão traduzida
        setError(err.response?.data?.message || t.ErroAoBuscarNoticias || 'Erro ao buscar notícias');
      } finally {
        setLoading(false);
      }
    };

    fetchNoticias();
    // Dependências: idioma e as chaves de tradução usadas para mensagens de erro
  }, [idioma, t.ErroAoBuscarNoticias, t.ErroInesperado]);


  // Mapeamento de nomes de meses para tradução
  const monthNames = {
    'janeiro': t.Janeiro || 'janeiro',
    'fevereiro': t.Fevereiro || 'fevereiro',
    'março': t.Marco || 'março',
    'abril': t.Abril || 'abril',
    'maio': t.Maio || 'maio',
    'junho': t.Junho || 'junho',
    'julho': t.Julho || 'julho',
    'agosto': t.Agosto || 'agosto',
    'setembro': t.Setembro || 'setembro',
    'outubro': t.Outubro || 'outubro',
    'novembro': t.Novembro || 'novembro',
    'dezembro': t.Dezembro || 'dezembro',
  };

  // Agrupa notícias por mês e ano
  const noticiasPorMes = noticias.reduce((acc, noticia) => {
    // Garante que noticia.data é um formato reconhecido (ex: YYYY-MM-DD)
    const dataNoticia = new Date(noticia.data);

    // Verifica se a data é válida antes de formatar
    if (isNaN(dataNoticia.getTime())) {
      console.warn("Data inválida encontrada:", noticia.data);
      return acc; // Pula notícias com data inválida
    }

    const ano = dataNoticia.getFullYear();
    // Localiza o nome do mês em pt-BR para usar como chave no monthNames
    const nomeMesPTBR = dataNoticia.toLocaleString('pt-BR', { month: 'long' });
    // Obtém o nome do mês traduzido
    const nomeMesTraduzido = monthNames[nomeMesPTBR] || nomeMesPTBR; // Usa o traduzido ou o original

    const mesAno = `${nomeMesTraduzido} ${ano}`;

    if (!acc[mesAno]) acc[mesAno] = [];
    acc[mesAno].push(noticia);
    return acc;
  }, {});

  // Renderiza mensagens de status
  if (loading) return <div className={styles.loading}>{t.CarregandoNoticias || 'Carregando notícias...'}</div>;
  if (error) return <div className={styles.error}>{t.ErroAoCarregarNoticias || 'Erro ao carregar notícias.'}: {error}</div>;
  if (noticias.length === 0 && !loading && !error) return <div className={styles.empty}>{t.NenhumaNoticiaEncontrada || 'Nenhuma notícia encontrada'}</div>;


  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Títulos da seção */}
        <p className={styles.smallTitle}>{t.NoticiasTituloPequeno || 'NOTÍCIAS'}</p>
        <h2 className={styles.bigTitle}>{t.NoticiasTituloGrande || 'Últimas Notícias do Lar Batista'}</h2>

        <div className={styles.noticiasContainer}>
          {/* Mapeia sobre os meses agrupados */}
          {Object.entries(noticiasPorMes).map(([mesAno, noticiasDoMes]) => (
            <div key={mesAno} className={styles.mesBloco}>
              <h3 className={styles.tituloMes}>{mesAno}</h3>
              <div className={styles.grid}>
                {/* Mapeia sobre as notícias dentro de cada mês */}
                {noticiasDoMes.map(noticia => {
                  const dataNoticia = new Date(noticia.data);
                  // Verifica se a data da notícia é anterior à data atual
                  const estaFinalizado = dataNoticia < new Date();

                  return (
                    <BoxNoticia
                      key={noticia.id}
                      titulo={noticia.nome} // Usar noticia.nome conforme backend
                      descricao={noticia.descricao}
                      data={noticia.data} // Passa a data original
                      finalizado={estaFinalizado}
                    // Passar 't' se BoxNoticia precisar de traduções internas
                    // t={t}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TodasNoticias;
