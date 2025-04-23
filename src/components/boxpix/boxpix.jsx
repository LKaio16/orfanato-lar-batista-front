import styles from './boxpix.module.css';

const BoxPix = () => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <img src="/assets/Pix.png" alt="Pix Logo" className={styles.logo} />
        <p className={styles.text}>
          Você pode ajudar nossas crianças de forma rápida e segura.
        </p>
        <p className={styles.text}>
          Faça sua doação pela chave Pix
        </p>
        <p className={styles.email}>Larbautista@gmail.com</p>
        <p className={styles.text}>
          Toda contribuição é bem-vinda e faz a diferença!
        </p>
      </div>
    </div>
  );
};

export default BoxPix;
