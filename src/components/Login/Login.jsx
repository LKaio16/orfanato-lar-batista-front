import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const LOGIN_ENDPOINT = `${API_BASE_URL}/auth/login`;

const Login = () => {
  // Estados
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [erroLogin, setErroLogin] = useState(""); // Mensagem de erro
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento

  const navigate = useNavigate();

  // Lida com o processo de login
  const handleLogin = async (e) => {
    e.preventDefault();
    setErroLogin("");
    setIsLoading(true);

    try {
      // Requisição POST para o endpoint de login
      const response = await axios.post(LOGIN_ENDPOINT, {
        nome: nome,
        senha: senha
      });

      // Verifica se a requisição foi bem-sucedida (status 2xx)
      if (response.status >= 200 && response.status < 300) {
        const usuarioLogado = response.data;

        // Armazena informações do usuário (idealmente um token JWT)
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));

        // Navega para o dashboard
        navigate("/dashboard");
      } else {
        // Fallback para outros status 2xx, embora 401 seja esperado para falha
        setErroLogin("Erro na resposta do servidor.");
      }

    } catch (err) {
      console.error("Erro de login:", err);
      // Lida com diferentes tipos de erro da requisição
      if (err.response) {
        // Erro do servidor (ex: 401 Unauthorized)
        setErroLogin(err.response.data.message || "Usuário ou senha incorretos.");
      } else if (err.request) {
        // Erro de conexão
        setErroLogin("Erro de conexão. Verifique sua rede.");
      } else {
        // Erro inesperado
        setErroLogin("Ocorreu um erro inesperado. Contate o suporte.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.form}>
        <h2 className={styles.title}>Login</h2>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Nome de usuário
          </label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className={styles.input}
            required
            disabled={isLoading}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Senha
          </label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className={styles.input}
            required
            disabled={isLoading}
          />
        </div>

        {/* Exibe a mensagem de erro */}
        {erroLogin && <p className={styles.error}>{erroLogin}</p>}

        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
};

export default Login;
