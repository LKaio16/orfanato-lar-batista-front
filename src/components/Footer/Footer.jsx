import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importar hook para navegação
import styles from './Footer.module.css'; // CSS Module
import { useIdioma } from '../../context/IdiomaContext'; // Importar o hook de idioma
import traducoes from '../../translations/traducoes'; // Importar o arquivo de traduções

// --- Caminhos para os ícones (substitua pelos seus caminhos reais) ---
const iconLocation = '/assets/icons/footer-location.png';
const iconEmail = '/assets/icons/footer-email.png';
const iconPhone = '/assets/icons/footer-phone.png';
// --- Fim dos Caminhos ---


export default function Footer() {
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear(); // Pega o ano atual dinamicamente

    const { idioma } = useIdioma(); // Usar o hook para obter o idioma atual
    const t = traducoes[idioma]; // Acessar as traduções para o idioma atual

    // Links do GitHub
    const githubFelipe = "https://github.com/felipe-Kunst";
    const githubKaio = "https://github.com/LKaio16";

    // Função para navegar (pode adicionar lógica extra como fechar menu aqui)
    const handleNavigate = (path) => {
        navigate(path);
        // Se você tiver uma função setMenuAberto vinda de props ou contexto, chame-a aqui:
        // setMenuAberto(false);
    };

    return (
        <footer className={styles.footer}>
            {/* Parte Principal (Azul) */}
            <div className={styles.footerMain}>
                <div className={styles.footerContainer}>

                    {/* Coluna de Contato */}
                    <div className={styles.contactInfo}>
                        {/* Endereço (mantido fixo - não traduzido) */}
                        <div className={styles.contactItem}>
                            <div className={styles.contactIconWrapper}>
                                {/* Usar tradução para alt text */}
                                <img src={iconLocation} alt={t.FooterIconeLocalizacaoAlt} className={styles.contactIcon} />
                            </div>
                            <span className={styles.contactText}>R. Antônio Botelho, 184 - Serrinha</span>
                        </div>
                        {/* Email (mantido fixo - não traduzido) */}
                        <div className={styles.contactItem}>
                            <div className={styles.contactIconWrapper}>
                                {/* Usar tradução para alt text */}
                                <img src={iconEmail} alt={t.FooterIconeEmailAlt} className={styles.contactIcon} />
                            </div>
                            <a href="mailto:atendimento@larbatista.com.br" className={`${styles.contactText} ${styles.linkEffect}`}>
                                atendimento@larbatista.com.br
                            </a>
                        </div>
                        {/* Telefone (mantido fixo - não traduzido) */}
                        <div className={styles.contactItem}>
                            <div className={styles.contactIconWrapper}>
                                {/* Usar tradução para alt text */}
                                <img src={iconPhone} alt={t.FooterIconeTelefoneAlt} className={styles.contactIcon} />
                            </div>
                            <a href="tel:+5585998362091" className={`${styles.contactText} ${styles.linkEffect}`}>
                                (85) 99836-2091
                            </a>
                        </div>
                    </div>

                    {/* Coluna do Menu */}
                    <div className={styles.footerMenu}>
                        {/* Usar tradução para o título do menu */}
                        <h4 className={styles.menuTitle}>{t.FooterMenuTitle}</h4>
                        <nav>
                            {/* Links de navegação usando traduções */}
                            <button className={styles.menuLink} onClick={() => handleNavigate("/")}>
                                {t.Home}
                            </button>
                            {/* <button className={styles.menuLink} onClick={() => handleNavigate("/sobre")}>
                                {t.Sobre}
                            </button> */}
                            <button className={styles.menuLink} onClick={() => handleNavigate("/noticias")}>
                                {t.Notícias}
                            </button>
                            <button className={styles.menuLink} onClick={() => handleNavigate("/Galeria")}>
                                {t.Galeria}
                            </button>
                            <button className={styles.menuLink} onClick={() => handleNavigate("/seja-voluntario")}> {/* Ajuste o path se necessário */}
                                {t.SejaVoluntario}
                            </button>
                            {/* Adicione o link "Como Doar" que você já tem no HeroSection */}
                            <button className={styles.menuLink} onClick={() => handleNavigate("/doacoes")}> {/* Ajuste o path se necessário */}
                                {t.Doar}
                            </button>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Barra Inferior (Copyright) */}
            <div className={styles.footerBottom}>
                <div className={styles.copyrightContainer}>
                    <p className={styles.copyrightText}>
                        {/* Usar a tradução e interpolar o ano */}
                        Copyright © {currentYear}
                        <a href={githubFelipe} target="_blank" rel="noopener noreferrer" className={styles.githubLink}> Felipe Kunst</a> e
                        <a href={githubKaio} target="_blank" rel="noopener noreferrer" className={styles.githubLink}> Luis Kaio</a>. {t.FooterCopyright}
                    </p>
                </div>
            </div>
        </footer>
    );
}