import { useEffect, useState } from 'react';
import styles from './CriarNoticia.module.css';
import axios from 'axios';

// URL base da API usando variável de ambiente com fallback
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
// Endpoint específico para notícias
const NOTICIAS_ENDPOINT = `${API_BASE_URL}/noticias`;

function CriarNoticia() {
  // Estado para lista de notícias
  const [noticias, setNoticias] = useState([]);
  // Estado para dados do formulário
  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    data: ''
  });

  // Estados para feedback do usuário
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Busca notícias do backend
  const fetchNoticias = async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.get(NOTICIAS_ENDPOINT);
      setNoticias(response.data);
    } catch (err) {
      console.error('Erro ao buscar notícias:', err);
      setError('Erro ao carregar notícias. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  // Carrega notícias ao montar o componente
  useEffect(() => {
    fetchNoticias();
  }, []);

  // Lida com mudança nos campos do formulário
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
    setSuccessMessage(null);
  };

  // Envia o formulário para criar notícia
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post(NOTICIAS_ENDPOINT, form);

      if (response.status === 201) {
        setSuccessMessage('Notícia criada com sucesso!');
        setForm({ nome: '', descricao: '', data: '' });
        fetchNoticias();
      } else {
        setError('Resposta inesperada do servidor ao criar notícia.');
      }

    } catch (err) {
      console.error('Erro ao criar notícia:', err);
      if (err.response?.data?.message) {
        setError(`Erro: ${err.response.data.message}`);
      } else {
        setError('Erro ao criar notícia. Verifique os dados e tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Lida com a exclusão de uma notícia
  const handleDelete = async (id) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.delete(`${NOTICIAS_ENDPOINT}/${id}`);

      if (response.status === 204) {
        setSuccessMessage('Notícia removida com sucesso!');
        setNoticias(noticias.filter((n) => n.id !== id)); // Atualiza estado localmente
      } else {
        setError('Resposta inesperada do servidor ao remover notícia.');
      }

    } catch (err) {
      console.error('Erro ao remover notícia:', err);
      if (err.response?.data?.message) {
        setError(`Erro ao remover: ${err.response.data.message}`);
      } else {
        setError('Erro ao remover notícia. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Notícias</h2>

      {/* Mensagens de status */}
      {isLoading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Título"
          value={form.nome}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
        <textarea
          name="descricao"
          placeholder="Descrição"
          value={form.descricao}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
        <input
          type="date"
          name="data"
          value={form.data}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Salvando...' : 'Adicionar Notícia'}
        </button>
      </form>

      <ul className={styles.lista}>
        {/* Exibe a lista de notícias se não estiver carregando/com erro */}
        {!isLoading && !error && noticias.map(noticia => (
          <li key={noticia.id}>
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
