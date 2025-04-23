import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './vervoluntarios.module.css';
// Importe componentes de feedback se tiver (ex: LoadingSpinner, ErrorMessage)
// import LoadingSpinner from '../LoadingSpinner';
// import ErrorMessage from '../ErrorMessage';

// URL base da API de voluntários no seu backend Spring Boot
const API_BASE_URL = 'http://localhost:8080/api/voluntarios';

const VerVoluntarios = () => {
  // Estado para armazenar a lista de voluntários
  const [voluntarios, setVoluntarios] = useState([]);
  // Estados para feedback ao usuário
  const [isLoading, setIsLoading] = useState(true); // Começa carregando
  const [error, setError] = useState(null); // Armazena mensagens de erro
  const [isDeleting, setIsDeleting] = useState(false); // Indica se uma exclusão está em andamento

  // Função para buscar a lista de voluntários do backend
  const fetchVoluntarios = async () => {
    setIsLoading(true); // Inicia o carregamento
    setError(null); // Limpa erros anteriores
    // Não limpamos isDeleting aqui, pois pode estar excluindo outro item

    try {
      // Requisição GET para o endpoint de listar todos os voluntários
      const response = await axios.get(API_BASE_URL);
      // A resposta do backend é uma lista de objetos Voluntario
      setVoluntarios(response.data);
    } catch (err) {
      console.error('Erro ao buscar voluntários:', err);
      // Exibe uma mensagem de erro amigável
      setError('Erro ao carregar a lista de voluntários. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false); // Finaliza o carregamento
    }
  };

  // Efeito para carregar os voluntários ao montar o componente
  useEffect(() => {
    fetchVoluntarios();
    // O array vazio garante que roda apenas uma vez ao montar
    // Se você quiser recarregar a lista em alguma outra condição, adicione-a aqui
  }, []);

  // Função para formatar a data de envio (já existente e parece correta)
  const formatarData = (dataISO) => {
    if (!dataISO) return 'Data não disponível'; // Trata caso a data não exista
    try {
      const data = new Date(dataISO);
      // Verifica se a data é válida antes de formatar
      if (isNaN(data.getTime())) {
        return 'Data inválida';
      }
      return new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'short'
      }).format(data);
    } catch (e) {
      console.error("Erro ao formatar data:", e);
      return 'Erro de formato de data';
    }
  };

  // Função para remover um voluntário
  const removerVoluntario = async (id) => {
    // Opcional: Perguntar ao usuário antes de deletar
    if (!window.confirm('Tem certeza que deseja remover este voluntário?')) {
      return;
    }

    setIsDeleting(true); // Indica que uma exclusão está em andamento
    setError(null); // Limpa erros anteriores

    try {
      // Requisição DELETE para o ID específico
      const response = await axios.delete(`${API_BASE_URL}/${id}`);

      // Verifica se a exclusão foi bem-sucedida (status 204 No Content)
      if (response.status === 204) {
        // Atualiza a lista no frontend removendo o voluntário deletado
        setVoluntarios(voluntarios.filter((v) => v.id !== id));
        // Opcional: Mostrar uma mensagem de sucesso (pode usar um estado similar ao 'successMessage' do CriarNoticia)
        console.log(`Voluntário com ID ${id} removido com sucesso.`);
      } else {
        // Lida com outros status 2xx que não 204
        setError('Resposta inesperada do servidor ao remover voluntário.');
      }

    } catch (err) {
      console.error('Erro ao remover voluntário:', err);
      // Lida com erros do backend (ex: voluntário não encontrado)
      if (err.response && err.response.data && err.response.data.message) {
        setError(`Erro ao remover: ${err.response.data.message}`);
      } else {
        setError('Erro ao remover voluntário. Tente novamente.');
      }
    } finally {
      setIsDeleting(false); // Finaliza a exclusão
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Lista de Voluntários</h2>

      {/* Exibe mensagens de status */}
      {isLoading && <p>Carregando voluntários...</p>}
      {isDeleting && <p>Removendo voluntário...</p>} {/* Mensagem específica para exclusão */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Exibe a lista se não estiver carregando e não houver erro */}
      {!isLoading && !error && voluntarios.length > 0 && (
        voluntarios.map((v) => (
          <div key={v.id} className={styles.card}>
            {/* Usar v.nome, v.email, etc. conforme o modelo Voluntario do backend */}
            <h3>{v.nome}</h3>
            <p><strong>Email:</strong> {v.email}</p>
            <p><strong>Telefone:</strong> {v.telefone}</p>
            <p><strong>Habilidades:</strong> {v.habilidades || 'Não informado'}</p> {/* Trata caso seja null/vazio */}
            <p><strong>Disponibilidade:</strong> {Array.isArray(v.disponibilidade) && v.disponibilidade.length > 0 ? v.disponibilidade.join(', ') : 'Não informada'}</p> {/* Verifica se é array e não está vazio */}
            <p><strong>Bio:</strong> {v.bio || 'Não informado'}</p> {/* Trata caso seja null/vazio */}
            <p><strong>Motivo:</strong> {v.motivo || 'Não informado'}</p> {/* Trata caso seja null/vazio */}

            {/* Exibe a data de envio se existir */}
            {v.dataEnvio && (
              <p><strong>Data de envio:</strong> {formatarData(v.dataEnvio)}</p>
            )}

            <div className={styles.botoes}>
              <button
                className={styles.botaoRemover}
                onClick={() => removerVoluntario(v.id)}
                disabled={isDeleting} // Desabilita o botão durante a exclusão
              >
                Remover pedido
              </button>

              <a
                className={styles.botaoEmail}
                href={`mailto:${v.email}?subject=Sobre sua solicitação de voluntariado`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Entrar em contato
              </a>
            </div>
          </div>
        ))
      )}

      {/* Mensagem se não houver voluntários e não estiver carregando/com erro */}
      {!isLoading && !error && voluntarios.length === 0 && (
        <p>Nenhum voluntário encontrado.</p>
      )}

    </div>
  );
};

export default VerVoluntarios;
