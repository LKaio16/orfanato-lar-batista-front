import styles from './Sobre.module.css';
import { FaInstagram } from 'react-icons/fa';

const Sobre = () => {
  return (
    <section className={styles.sobreContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.infoContainer}>
          <h2>Quem Somos</h2>
          <p>
            O Lar Batista é uma casa que acolhe bebês de 00 a 2 anos vítimas de violência, abandono e entrega espontânea.<br />
            Nossa casa é mantida somente por doações, portanto toda ajuda é muito bem-vinda.<br />
            Nossa vaquinha é voltada para fins de gastos mensais da casa.<br />
            Faça parte da nossa história e da vida de cada criança que passa por nós.
          </p>
        </div>

        <div className={styles.redesSociais}>
          <h3>Conheça nossas Redes Sociais</h3>
          <a href="" target="_blank" rel="noreferrer">
            <FaInstagram className={styles.iconeInstagram} />
            Siga-nos pelo instagram
          </a>
        </div>
      </div>
    </section>
  );
};

export default Sobre;
