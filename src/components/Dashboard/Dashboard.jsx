import React from "react";
import styles from "./Dashboard.module.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src="/assets/logo.png" alt="Logo Lar Batista" className={styles.logo} />
        <div>
          <h1 className={styles.titulo}>Dashboard</h1>
          <h2 className={styles.subtitulo}>
            BEM VINDO(@) <strong>{usuario?.nome}</strong>
          </h2>
        </div>
      </div>

      <div className={styles.cards}>
        <div className={styles.card} onClick={() => navigate("/criar-noticia")}>
          <span className={styles.icon}>📝</span>
          <p>Adicionar Novas Notícias</p>
        </div>

        <div className={styles.card} onClick={() => navigate("/adicionar-fotos")}>
          <span className={styles.icon}>📷</span>
          <p>Adicionar Novas Fotos</p>
        </div>

        <div className={styles.card} onClick={() => navigate("/lista-voluntarios")}>
          <span className={styles.icon}>👥</span>
          <p>Ver Pedidos de Voluntários</p>
        </div>

        <div className={styles.card} onClick={() => navigate("/visualizar-contatos")}>
          <span className={styles.icon}>🤝</span>
          <p>Ver Pedidos de Contato</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
