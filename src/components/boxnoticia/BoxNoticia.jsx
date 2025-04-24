import React from "react";
import styles from "./boxnoticia.module.css";
import { DateTime } from "luxon";


const BoxNoticia = ({ titulo, descricao, data, cor, finalizado }) => {
  const dataFormatada = DateTime.fromISO(data, { zone: "America/Sao_Paulo", locale: "pt-BR" }).toFormat("dd 'de' LLLL 'de' yyyy");


  return (
    <div className={styles.card}>
      {finalizado && <div className={styles.faixaFinalizado}>FINALIZADO</div>}
      <span className={styles.categoria} style={{ backgroundColor: cor }}>
        Notícias
      </span>
      <h3>{titulo}</h3>
      <p>{descricao}</p>
      <small>{dataFormatada}</small>
    </div>
  );
};

export default BoxNoticia;
