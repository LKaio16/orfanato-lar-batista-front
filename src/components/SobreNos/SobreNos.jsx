import React from 'react';
import styles from './SobreNos.module.css'; // CSS Module para estilização
import { useIdioma } from '../../context/IdiomaContext'; // Importar o hook de idioma
import traducoes from '../../translations/traducoes'; // Importar o arquivo de traduções
import aboutImage from '/assets/sobre-nos.png';
import instagramIcon from '/assets/icons/instagram.svg';

export default function SobreNos() {
    const { idioma } = useIdioma(); // Usar o hook para obter o idioma atual
    const t = traducoes[idioma]; // Acessar as traduções para o idioma atual

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* Coluna da Imagem (Esquerda) */}
                <div className={styles.imageColumn}>
                    <div className={styles.imageWrapper}>
                        {/* Elementos decorativos - Simplificados */}
                        <div className={`${styles.deco} ${styles.decoShape1}`}></div>
                        <div className={`${styles.deco} ${styles.decoShape2}`}></div>
                        {/* Linhas decorativas (podem ser mais complexas - SVG seria ideal) */}
                        {/* <div className={`${styles.deco} ${styles.decoLines}`}></div> */}

                        <img
                            src={aboutImage}
                            // Usar a tradução para o texto alternativo da imagem
                            alt={t.SobreNosImagemAlt}
                            className={styles.image}
                        />
                    </div>
                </div>

                {/* Coluna do Texto (Direita) */}
                <div className={styles.textColumn}>
                    {/* Usar as traduções para os títulos e parágrafos */}
                    <p className={styles.smallTitle}>{t.SobreNosTituloPequeno}</p>
                    <h2 className={styles.bigTitle}>{t.SobreNosTituloGrande}</h2> {/* Fonte Rowdies aplicada via CSS */}
                    <p className={styles.paragraph}>
                        {t.SobreNosParagrafo1}
                    </p>
                    <p className={styles.paragraph}>
                        {t.SobreNosParagrafo2}
                    </p>

                    <a
                        href="https://www.instagram.com/casalarbatista/" // Link para o Instagram
                        target="_blank" // Abre em uma nova aba
                        rel="noopener noreferrer" // Segurança recomendada ao usar target="_blank"
                        className={styles.ctaButton} // Mantém a classe CSS para estilização do botão
                    >
                        {/* Container para alinhar ícone e texto */}
                        <span className={styles.buttonContent}>
                            {/* Ícone do Instagram */}
                            <img
                                src={instagramIcon}
                                alt="Ícone Instagram" // Alt text para acessibilidade
                                className={styles.instagramIcon} // Classe CSS para estilizar o ícone
                            />
                            {/* Texto do botão, usando a nova chave de tradução */}
                            {t.SobreNosBotaoInstagram}
                        </span>
                    </a>
                </div>
            </div>
        </section>
    );
}