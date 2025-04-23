import { useEffect, useState } from 'react';
import styles from './CriarNoticia.module.css';
import axios from 'axios'; // Importe o axios

// URL base da API de notícias no seu backend Spring Boot
const API_BASE_URL = 'http://localhost:8080/api/noticias';

function CriarNoticia() {
  // Estado para armazenar a lista de notícias
  const [noticias, setNoticias] = useState([]);
  // Estado para controlar os dados do formulário (usando 'nome' em vez de 'titulo')
  const [form, setForm] = useState({
    nome: '', // Alterado de 'titulo' para 'nome' para corresponder ao backend
    descricao: '',
    data: '' // Formato YYYY-MM-DD esperado pelo input type="date" e geralmente compatível com backends
  });

  // Estados para feedback ao usuário
  const [isLoading, setIsLoading] = useState(false); // Indica se uma requisição está em andamento
  const [error, setError] = useState(null); // Armazena mensagens de erro
  const [successMessage, setSuccessMessage] = useState(null); // Armazena mensagens de sucesso

  // Função para buscar as notícias do backend
  const fetchNoticias = async () => {
    setIsLoading(true); // Inicia o carregamento
    setError(null); // Limpa erros anteriores
    setSuccessMessage(null); // Limpa mensagens de sucesso anteriores

    try {
      const response = await axios.get(API_BASE_URL);
      // A resposta do backend é uma lista de objetos Noticias
      setNoticias(response.data);
    } catch (err) {
      console.error('Erro ao buscar notícias:', err);
      // Exibe uma mensagem de erro amigável
      setError('Erro ao carregar notícias. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false); // Finaliza o carregamento
    }
  };

  // Efeito para carregar as notícias ao montar o componente
  useEffect(() => {
    fetchNoticias();
  }, []); // O array vazio garante que roda apenas uma vez ao montar

  // Lida com a mudança nos campos do formulário
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Limpa mensagens de status ao começar a digitar
    setError(null);
    setSuccessMessage(null);
  };

  // Lida com o envio do formulário para criar uma nova notícia
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Inicia o carregamento
    setError(null); // Limpa erros anteriores
    setSuccessMessage(null); // Limpa mensagens de sucesso anteriores

    try {
      // Envia os dados do formulário como um objeto Noticias para o backend
      const response = await axios.post(API_BASE_URL, form);

      // Verifica se a criação foi bem-sucedida (status 201 Created)
      if (response.status === 201) {
        setSuccessMessage('Notícia criada com sucesso!'); // Define mensagem de sucesso
        setForm({ nome: '', descricao: '', data: '' }); // Limpa o formulário
        fetchNoticias(); // Recarrega a lista de notícias
      } else {
        // Lida com outros status 2xx que não 201, embora o backend retorne 201
        setError('Resposta inesperada do servidor ao criar notícia.');
      }

    } catch (err) {
      console.error('Erro ao criar notícia:', err);
      // Lida com erros do backend (ex: validação, erro interno)
      if (err.response && err.response.data && err.response.data.message) {
        // Se o backend retornar uma mensagem de erro específica
        setError(`Erro: ${err.response.data.message}`);
      } else {
        // Mensagem de erro genérica
        setError('Erro ao criar notícia. Verifique os dados e tente novamente.');
      }
    } finally {
      setIsLoading(false); // Finaliza o carregamento
    }
  };

  // Lida com a exclusão de uma notícia
  const handleDelete = async (id) => {
    setIsLoading(true); // Inicia o carregamento
    setError(null); // Limpa erros anteriores
    setSuccessMessage(null); // Limpa mensagens de sucesso anteriores

    try {
      // Envia a requisição DELETE para o ID específico
      const response = await axios.delete(`${API_BASE_URL}/${id}`);

      // Verifica se a exclusão foi bem-sucedida (status 204 No Content)
      if (response.status === 204) {
        setSuccessMessage('Notícia removida com sucesso!'); // Define mensagem de sucesso
        fetchNoticias(); // Recarrega a lista de notícias
      } else {
        // Lida com outros status 2xx que não 204
        setError('Resposta inesperada do servidor ao remover notícia.');
      }

    } catch (err) {
      console.error('Erro ao remover notícia:', err);
      // Lida com erros do backend (ex: notícia não encontrada)
      if (err.response && err.response.data && err.response.data.message) {
        setError(`Erro: ${err.response.data.message}`);
      } else {
        setError('Erro ao remover notícia. Tente novamente.');
      }
    } finally {
      setIsLoading(false); // Finaliza o carregamento
    }
  };

  return (
    <div className={styles.container}>
      <h2>Notícias</h2>

      {/* Exibe mensagens de status */}
      {isLoading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}


      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome" // Alterado para 'nome'
          placeholder="Título"
          value={form.nome} // Alterado para form.nome
          onChange={handleChange}
          required
          disabled={isLoading} // Desabilita enquanto carrega
        />
        <textarea
          name="descricao"
          placeholder="Descrição"
          value={form.descricao}
          onChange={handleChange}
          required
          disabled={isLoading} // Desabilita enquanto carrega
        />
        <input
          type="date"
          name="data"
          value={form.data}
          onChange={handleChange}
          required
          disabled={isLoading} // Desabilita enquanto carrega
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Salvando...' : 'Adicionar Notícia'} {/* Texto do botão com estado de loading */}
        </button>
      </form>

      <ul className={styles.lista}>
        {/* Exibe a lista de notícias se não estiver carregando e não houver erro */}
        {!isLoading && !error && noticias.map(noticia => (
          <li key={noticia.id}>
            {/* Usa noticia.nome para o título */}
            <h3>{noticia.nome}</h3>
            <p>{noticia.descricao}</p>
            <span>{noticia.data}</span>
            <button onClick={() => handleDelete(noticia.id)} disabled={isLoading}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CriarNoticia;
