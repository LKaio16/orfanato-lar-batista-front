import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import axios from 'axios'; // Importe o axios

const Login = () => {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [erroLogin, setErroLogin] = useState(""); // Estado unificado para mensagens de erro
  const [isLoading, setIsLoading] = useState(false); // Estado para indicar carregamento

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErroLogin(""); // Limpa erros anteriores
    setIsLoading(true); // Inicia o carregamento

    try {
      // Requisição POST para o endpoint de login do backend
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        nome: nome,
        senha: senha
      });

      // Verifica se a requisição foi bem-sucedida (status 2xx)
      if (response.status >= 200 && response.status < 300) {
        const usuarioLogado = response.data; // A resposta deve ser o UsuarioResponseDTO

        // Armazena as informações do usuário (ex: id e nome)
        // É recomendado não armazenar informações sensíveis como a senha aqui.
        // O ideal seria um token JWT, mas para este exemplo, armazenamos o id e nome.
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));

        // Navega para o dashboard
        navigate("/dashboard");
      } else {
        // Embora o backend com Spring Security deva retornar erros com status apropriados,
        // este else é um fallback. A lógica de catch abaixo lidará melhor com 4xx e 5xx.
        setErroLogin("Erro na resposta do servidor.");
      }

    } catch (err) {
      console.error("Erro de login:", err);
      // Captura erros da requisição (status 4xx, 5xx, etc.)
      if (err.response) {
        // Se houver resposta do servidor (erro HTTP)
        if (err.response.status === 401) {
          // Erro de autenticação (Usuário não encontrado ou Senha incorreta)
          // O backend idealmente retornaria uma mensagem específica aqui
          setErroLogin(err.response.data.message || "Usuário ou senha incorretos.");
        } else {
          // Outros erros do servidor
          setErroLogin("Erro no servidor. Tente novamente mais tarde.");
        }
      } else if (err.request) {
        // A requisição foi feita, mas nenhuma resposta foi recebida
        setErroLogin("Erro de conexão. Verifique sua rede.");
      } else {
        // Algo aconteceu na configuração da requisição que disparou um erro
        setErroLogin("Ocorreu um erro inesperado. Contate o suporte.");
      }
    } finally {
      setIsLoading(false); // Finaliza o carregamento
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.form}>
        <h2 className={styles.title}>Login</h2>

        <div className={styles.formGroup}> {/* Adiciona um contêiner para label e input */}
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
        </div> {/* Fim do formGroup */}

        <div className={styles.formGroup}> {/* Adiciona um contêiner para label e input */}
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
        </div> {/* Fim do formGroup */}


        {/* Exibe a mensagem de erro unificada */}
        {erroLogin && <p className={styles.error}>{erroLogin}</p>}

        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? 'Entrando...' : 'Entrar'} {/* Texto do botão muda ao carregar */}
        </button>
      </form>
    </div>
  );
};

export default Login;