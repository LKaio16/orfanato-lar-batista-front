import React, { useEffect, useState } from 'react';
import styles from './todasnoticias.module.css'; // Importe seu CSS Module
import BoxNoticia from '../boxnoticia/BoxNoticia.jsx';
import { useIdioma } from '../../context/IdiomaContext'; // Importar o hook de idioma
import traducoes from '../../translations/traducoes'; // Importar o arquivo de traduções


function TodasNoticias() {
  const { idioma } = useIdioma(); // Usar o hook para obter o idioma atual
  const t = traducoes[idioma]; // Acessar as traduções para o idioma atual

  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        // Ajuste a URL da API conforme necessário
        const response = await fetch('http://localhost:8080/api/noticias');
        if (!response.ok) {
          // Usar tradução para a mensagem de erro
          throw new Error(t.ErroAoBuscarNoticias || 'Erro ao buscar notícias');
        }
        const data = await response.json();
        setNoticias(data);
      } catch (err) {
        console.error('Erro:', err);
        // Usar a mensagem de erro da API ou a mensagem padrão traduzida
        setError(err.message || t.ErroInesperado || 'Ocorreu um erro inesperado');
      } finally {
        setLoading(false);
      }
    };

    fetchNoticias();
    // Adiciona idioma como dependência para recarregar notícias ao mudar de idioma
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


  const noticiasPorMes = noticias.reduce((acc, noticia) => {
    const dataNoticia = new Date(noticia.data);
    const ano = dataNoticia.getFullYear();
    // Localiza o nome do mês no idioma atual
    const nomeMesPTBR = dataNoticia.toLocaleString('pt-BR', { month: 'long' });
    const nomeMesTraduzido = monthNames[nomeMesPTBR] || nomeMesPTBR; // Usa o traduzido ou o original
    const mesAno = `${nomeMesTraduzido} ${ano}`;


    if (!acc[mesAno]) acc[mesAno] = [];
    acc[mesAno].push(noticia);
    return acc;
  }, {});

  // Usar traduções para as mensagens de status
  if (loading) return <div className={styles.loading}>{t.CarregandoNoticias || 'Carregando notícias...'}</div>;
  if (error) return <div className={styles.error}>{t.ErroAoCarregarNoticias || 'Erro ao carregar notícias.'}: {error}</div>;
  if (noticias.length === 0) return <div className={styles.empty}>{t.NenhumaNoticiaEncontrada || 'Nenhuma notícia encontrada'}</div>;


  return (
    <section className={styles.section}> {/* Usar a classe section */}
      <div className={styles.container}> {/* Usar a classe container */}
        {/* Adicionar títulos da seção, seguindo o padrão */}
        <p className={styles.smallTitle}>{t.NoticiasTituloPequeno || 'NOTÍCIAS'}</p>
        <h2 className={styles.bigTitle}>{t.NoticiasTituloGrande || 'Últimas Notícias do Lar Batista'}</h2>

        <div className={styles.noticiasContainer}> {/* Manter este container se necessário para layout interno */}
          {Object.entries(noticiasPorMes).map(([mesAno, noticiasDoMes]) => (
            <div key={mesAno} className={styles.mesBloco}>
              <h3 className={styles.tituloMes}>{mesAno}</h3> {/* Usar h3 para título do mês */}
              <div className={styles.grid}> {/* Usar a classe grid */}
                {noticiasDoMes.map(noticia => {
                  const dataNoticia = new Date(noticia.data);
                  const estaFinalizado = dataNoticia < new Date(); // Melhor verificar com new Date() atual

                  return (
                    <BoxNoticia
                      key={noticia.id}
                      titulo={noticia.nome}
                      descricao={noticia.descricao}
                      data={noticia.data}
                      // Você pode passar o idioma ou o 't' para o BoxNoticia
                      // se ele precisar traduzir algo interno como a data formatada.
                      // Por enquanto, a formatação do mês já está traduzida acima.
                      finalizado={estaFinalizado}
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