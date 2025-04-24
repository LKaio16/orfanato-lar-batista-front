import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import traducoes from '../../translations/traducoes';
import logo from '/assets/logo.png'; // Verifique o caminho correto da logo
import BR from '/assets/br.jpeg'; // Verifique o caminho correto das bandeiras
import EN from '/assets/eua.png';
import ES from '/assets/esp.png';
import { FaChevronDown } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useIdioma } from '../../context/IdiomaContext';

export default function Navbar() {
  const { idioma, setIdioma } = useIdioma();
  const t = traducoes[idioma];
  const [mostrarIdiomas, setMostrarIdiomas] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const navigate = useNavigate();
  const bandeiras = { BR: BR, EN: EN, ES: ES };

  // Função unificada para trocar idioma
  const handleTrocarIdioma = (novoIdioma) => {
    setIdioma(novoIdioma);
    setMostrarIdiomas(false);
    if (menuAberto) setMenuAberto(false); // Fecha o menu se estiver aberto
  };

  // Função para alternar o estado do menu
  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  // Efeito para controlar a classe 'scrolling' na navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`${styles.navbar} ${isScrolling ? styles.scrolling : ''}`}>
        <div className={styles.navLeft}>
          {/* Logo Desktop */}
          <img src={logo} alt="Logo" className={`${styles.logo} ${styles.logoDesktop}`} onClick={() => { navigate("/"); setMenuAberto(false); }} /> {/* Link para a Home */}

          {/* Logo Mobile (visível apenas quando o menu está aberto em mobile) */}
          {/* A visibilidade da logo mobile é controlada pelo CSS na media query */}
          {/* A classe menuLogoVisible controla a opacidade quando o menu está aberto */}
          <img src={logo} alt="Logo" className={`${styles.logo} ${styles.logoMobile} ${menuAberto ? styles.menuLogoVisible : ''}`} onClick={() => { navigate("/"); setMenuAberto(false); }} /> {/* Link para a Home */}


          {/* Links de Navegação */}
          <nav className={`${styles.navLinks} ${menuAberto ? styles.menuOpen : ''}`}>
            <button className={styles.link} onClick={() => { navigate("/"); setMenuAberto(false); }}>
              {t.Home}
            </button>
            {/*  Seção Sobre Nós comentada, descomente se precisar */}
            {/*  <button className={styles.link} onClick={() => { navigate("/sobre"); setMenuAberto(false); }}>
              {t.Sobre}
            </button> */}
            <button className={styles.link} onClick={() => { navigate("/noticias"); setMenuAberto(false); }}>
              {t.Notícias}
            </button>
            <button className={styles.link} onClick={() => { navigate("/Galeria"); setMenuAberto(false); }}>
              {t.Galeria}
            </button>
            <button className={styles.link} onClick={() => { navigate("/SejaVoluntario"); setMenuAberto(false); }}>
              {t.SejaVoluntario}
            </button>
          </nav>
        </div>

        {/* Seção Direita (Botão Doar e Seletor de Idioma) */}
        <div className={`${styles.navRight} ${menuAberto ? styles.menuOpen : ''}`}>
          {/* Botão Doar */}
          <button
            className={styles.donateBtn}
            onClick={() => { navigate("/doações"); setMenuAberto(false); }}
          >
            {t.Doar}
          </button>

          {/* Seletor de Idioma */}
          <div className={styles.LinguagemSelector}>
            {/* Botão que exibe o idioma atual e abre o dropdown */}
            <button
              className={styles.langButton}
              onClick={() => setMostrarIdiomas(!mostrarIdiomas)}
            >
              <img src={bandeiras[idioma]} alt={`Idioma ${idioma}`} width={24} height={16} />
              <FaChevronDown fill='black' />
            </button>

            {/* Dropdown de opções de idioma */}
            <div className={`${styles.langDropdown} ${mostrarIdiomas ? styles.showDropdown : ''}`}>
              {/* Opção Português */}
              <div className={styles.langOption} onClick={() => handleTrocarIdioma('BR')}>
                <img src={BR} alt="Português" width={24} height={16} /> BR
              </div>
              {/* Opção Inglês */}
              <div className={styles.langOption} onClick={() => handleTrocarIdioma('EN')}>
                <img src={EN} alt="Inglês" width={24} height={16} /> EN
              </div>
              {/* Opção Espanhol */}
              <div className={styles.langOption} onClick={() => handleTrocarIdioma('ES')}>
                <img src={ES} alt="Espanhol" width={24} height={16} /> ES
              </div>
            </div>
          </div>
        </div>

        {/* Botão Toggle do Menu Mobile */}
        <button
          className={`${styles.menuToggle} ${menuAberto ? styles.menuActive : ''}`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Overlay do Menu (clicável para fechar) */}
        {/* Renderiza apenas quando o menuAberto é true */}
        {menuAberto && (
          <div
            className={`${styles.menuOverlay} ${menuAberto ? styles.menuOpen : ''}`}
            onClick={toggleMenu}
            role="button"
            tabIndex={0}
            aria-label="Fechar menu"
          ></div>
        )}
      </header>
    </>
  );
}
