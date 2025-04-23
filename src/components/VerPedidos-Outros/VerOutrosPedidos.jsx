import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './VerOutrosPedidos.module.css'; // Assumindo que este é o CSS correto

// URL base da API de contatos no seu backend Spring Boot
const API_BASE_URL = 'http://localhost:8080/api/contatos';

const VisualizarContatos = () => {
  // Estado para armazenar a lista de contatos
  const [contatos, setContatos] = useState([]);
  // Estados para feedback ao usuário
  const [isLoading, setIsLoading] = useState(true); // Começa carregando
  const [error, setError] = useState(null); // Armazena mensagens de erro
  const [isDeleting, setIsDeleting] = useState(false); // Indica se uma exclusão está em andamento

  // Função para buscar a lista de contatos do backend
  const fetchContatos = async () => {
    setIsLoading(true); // Inicia o carregamento
    setError(null); // Limpa erros anteriores
    // Não limpamos isDeleting aqui, pois pode estar excluindo outro item

    try {
      // Requisição GET para o endpoint de listar todos os contatos
      const response = await axios.get(API_BASE_URL);
      // A resposta do backend é uma lista de objetos Contato
      setContatos(response.data);
    } catch (err) {
      console.error('Erro ao buscar contatos:', err);
      // Exibe uma mensagem de erro amigável
      setError('Erro ao carregar as mensagens. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false); // Finaliza o carregamento
    }
  };

  // Efeito para carregar os contatos ao montar o componente
  useEffect(() => {
    fetchContatos();
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

  // Função para remover um contato
  const removerContato = async (id) => {
    // Opcional: Perguntar ao usuário antes de deletar
    if (!window.confirm('Tem certeza que deseja remover esta mensagem?')) {
      return;
    }

    setIsDeleting(true); // Indica que uma exclusão está em andamento
    setError(null); // Limpa erros anteriores

    try {
      // Requisição DELETE para o ID específico
      const response = await axios.delete(`${API_BASE_URL}/${id}`);

      // Verifica se a exclusão foi bem-sucedida (status 204 No Content)
      if (response.status === 204) {
        // Atualiza a lista no frontend removendo o contato deletado
        setContatos(contatos.filter((c) => c.id !== id));
        // Opcional: Mostrar uma mensagem de sucesso
        console.log(`Mensagem com ID ${id} removida com sucesso.`);
      } else {
        // Lida com outros status 2xx que não 204
        setError('Resposta inesperada do servidor ao remover mensagem.');
      }

    } catch (err) {
      console.error('Erro ao remover contato:', err);
      // Lida com erros do backend (ex: contato não encontrado)
      if (err.response && err.response.data && err.response.data.message) {
        setError(`Erro ao remover: ${err.response.data.message}`);
      } else {
        setError('Erro ao remover mensagem. Tente novamente.');
      }
    } finally {
      setIsDeleting(false); // Finaliza a exclusão
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Mensagens Recebidas</h2>

      {/* Exibe mensagens de status */}
      {isLoading && <p>Carregando mensagens...</p>}
      {isDeleting && <p>Removendo mensagem...</p>} {/* Mensagem específica para exclusão */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Exibe a lista se não estiver carregando e não houver erro */}
      {!isLoading && !error && contatos.length > 0 && (
        contatos.map((c) => (
          <div key={c.id} className={styles.card}>
            {/* Usar c.nome, c.email, etc. conforme o modelo Contato do backend */}
            <h3>{c.nome}</h3>
            <p><strong>Email:</strong> {c.email || 'Não informado'}</p> {/* Trata caso seja null/vazio */}
            <p><strong>Empresa:</strong> {c.empresa || 'Não informado'}</p> {/* Trata caso seja null/vazio */}
            <p><strong>Telefone:</strong> {c.telefone || 'Não informado'}</p> {/* Trata caso seja null/vazio */}
            <p><strong>Assunto:</strong> {c.assunto || 'Não informado'}</p> {/* Trata caso seja null/vazio */}
            <p><strong>Mensagem:</strong> {c.mensagem || 'Não informado'}</p> {/* Trata caso seja null/vazio */}

            {/* Exibe a data de envio se existir */}
            {c.dataEnvio && (
              <p><strong>Data de envio:</strong> {formatarData(c.dataEnvio)}</p>
            )}

            <div className={styles.botoes}>
              <button
                className={styles.botaoRemover}
                onClick={() => removerContato(c.id)}
                disabled={isDeleting} // Desabilita o botão durante a exclusão
              >
                Remover contato
              </button>

              <a
                className={styles.botaoEmail}
                href={`mailto:${c.email}?subject=Resposta: ${c.assunto || ''}&body=Olá ${c.nome || ''},%0A%0AReferente à sua mensagem sobre "${c.assunto || ''}", segue nossa resposta...`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Responder por email
              </a>
            </div>
          </div>
        ))
      )}

      {/* Mensagem se não houver contatos e não estiver carregando/com erro */}
      {!isLoading && !error && contatos.length === 0 && (
        <p>Nenhuma mensagem encontrada.</p>
      )}

    </div>
  );
};

export default VisualizarContatos;
