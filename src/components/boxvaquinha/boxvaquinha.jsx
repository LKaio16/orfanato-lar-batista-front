import styles from './boxvaquinha.module.css';

const BoxVakinha = () => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <img src="/assets/Vaquinha.png" alt="Vakinha Logo" className={styles.logo} />
        <p className={styles.text}>
          Estamos com uma vaquinha online para apoiar o Lar Batista.
        </p>
        <p className={styles.text}>
          Acesse o link e contribua com qualquer valor:
        </p>
        <a href="https://www.vaquinha.com.br/larbatista" className={styles.link} target="_blank" rel="noopener noreferrer">
          www.vaquinha.com.br/larbatista
        </a>
        <p className={styles.text}>
          Sua ajuda transforma vidas!
        </p>
      </div>
    </div>
  );
};

export default BoxVakinha;
