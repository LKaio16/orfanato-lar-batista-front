import React, { useState } from 'react';
import styles from './DoaçõesAlimentos.module.css'; // Importe seu CSS Module
import { FaMapMarkerAlt } from 'react-icons/fa';
import BoxVakinha from '../boxvaquinha/boxvaquinha'; // Assumindo que este componente existe
import BoxPix from '../boxpix/boxpix'; // Assumindo que este componente existe
import { useIdioma } from '../../context/IdiomaContext'; // Importar o hook de idioma
import traducoes from '../../translations/traducoes'; // Importar o arquivo de traduções


const DoacaoAlimentos = () => {
  const { idioma } = useIdioma(); // Usar o hook para obter o idioma atual
  const t = traducoes[idioma]; // Acessar as traduções para o idioma atual

  const [activeTab, setActiveTab] = useState('alimentos');

  return (
    <section className={styles.section}> {/* Usar a classe section */}
      <div className={styles.container}> {/* Usar a classe container */}

        {/* Adicionar títulos da seção principal (Opcional, dependendo do layout desejado) */}
        {/* <p className={styles.smallTitle}>{t.DoacoesTituloPequeno || 'COMO DOAR'}</p>
        <h2 className={styles.bigTitle}>{t.DoacoesTituloGrande || 'Sua Ajuda Transforma Vidas'}</h2> */}
        {/* Fim dos títulos da seção principal */}

        <div className={styles.tabsContainer}> {/* Novo container para as abas e o conteúdo das abas */}
          <div className={styles.tabs}>
            {/* Usar traduções para o texto das abas */}
            <button
              className={`${styles.tab} ${activeTab === 'alimentos' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('alimentos')}
            >
              {t.TabAlimentos || 'Doação Alimentos'}
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'monetaria' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('monetaria')}
            >
              {t.TabMonetaria || 'Doação Monetária'}
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'outras' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('outras')}
            >
              {t.TabOutras || 'Outras Doações'}
            </button>
          </div>

          {/* Conteúdo das Abas */}
          <div className={styles.tabContent}>
            {activeTab === 'alimentos' && (
              <div className={styles.card}> {/* Manter ou adaptar a classe .card */}
                {/* Usar traduções para títulos e descrições */}
                <h2 className={styles.sectionTitleInsideTab}>{t.AlimentosTitulo || 'Doe Amor em Forma de Alimento ⚪❤️'}</h2> {/* Nova classe para título dentro da aba */}
                <p className={styles.paragraph}>{t.AlimentosDescricao || 'O Lar Batista está recebendo doações de alimentos...'}</p>

                {/* Lista de Itens */}
                <h3 className={styles.subtitleInsideTab}>{t.AlimentosSubtituloItens || 'Confira alguns itens que você pode doar:'}</h3> {/* Nova classe para subtítulo dentro da aba */}
                <ul className={styles.list}>
                  {/* Mapear sobre a lista traduzida */}
                  {(t.AlimentosListaItens || []).map((item, index) => (
                    <li key={index} className={styles.listItem}>{item}</li>
                  ))}
                </ul>

                {/* Informação de Localização (Ponto de Coleta) */}
                <h3 className={styles.subtitleInsideTab}>{t.DoacoesSubtituloPontosColeta || 'Pontos de coletas'}</h3>
                <div className={styles.locationContainer}>
                  <FaMapMarkerAlt className={styles.icon} />
                  <span className={styles.locationText}>{t.DoacoesLocalizacaoTexto || 'R. Antônio Botelho, 184 Fortaleza - CE'}</span>
                </div>
              </div>
            )}

            {activeTab === 'monetaria' && (
              <div className={styles.monetariaWrapper}> {/* Manter este wrapper se necessário */}
                {/* Assumimos que BoxPix e BoxVakinha já lidam com suas próprias traduções */}
                <BoxPix />

                {/* 
                <div className={styles.monetariaSeparator}>{t.MonetariaSeparadorOU || 'OU'}</div> {/* Usar tradução para o separador 
                <BoxVakinha />
                 */}

              </div>
            )}

            {activeTab === 'outras' && (
              <div className={styles.card}> {/* Manter ou adaptar a classe .card */}
                {/* Usar traduções para títulos e descrições */}
                <h2 className={styles.sectionTitleInsideTab}>{t.OutrasTitulo || '💛 Outras Formas de Doar'}</h2> {/* Usar a mesma classe de título dentro da aba */}
                <p className={styles.paragraph}>{t.OutrasDescricao || 'Você também pode ajudar o Lar Batista com outras doações'}</p> {/* Usar a classe paragraph */}

                {/* Lista de Outros Itens */}
                <ul className={styles.list}>
                  {(t.OutrasListaItens || []).map((item, index) => (
                    <li key={index} className={styles.listItem} >{item}</li>
                  ))}
                </ul>

                {/* Informação de Localização (Ponto de Coleta) - Repetido, pode ser um componente separado se for complexo */}
                <h3 className={styles.subtitleInsideTab}>{t.DoacoesSubtituloPontosColeta || 'Pontos de coletas'}</h3>
                <div className={styles.locationContainer}>
                  <FaMapMarkerAlt className={styles.icon} />
                  <span className={styles.locationText}>{t.DoacoesLocalizacaoTexto || 'R. Antônio Botelho, 184 Fortaleza - CE'}</span>
                </div>

                {/* Mensagem de Agradecimento */}
                <p className={styles.thankYou}>{t.OutrasMensagemAgradecimento || 'Toda ajuda é muito bem-vinda... 💕'}</p> {/* Usar a classe paragraph se for apropriado */}
              </div>
            )}
          </div> {/* Fim do Conteúdo das Abas */}

        </div> {/* Fim do tabsContainer */}

      </div> {/* Fim do container */}
    </section> // Fim da section
  );
};

export default DoacaoAlimentos;