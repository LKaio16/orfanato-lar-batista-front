import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './VerOutrosPedidos.module.css';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const CONTATOS_ENDPOINT = `${API_BASE_URL}/contatos`;

const VisualizarContatos = () => {
  // Estados
  const [contatos, setContatos] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Carregamento inicial
  const [error, setError] = useState(null); // Mensagens de erro
  const [isDeleting, setIsDeleting] = useState(false); // Indica exclusão em andamento

  // Busca a lista de contatos do backend
  const fetchContatos = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(CONTATOS_ENDPOINT);
      setContatos(response.data);
    } catch (err) {
      console.error('Erro ao buscar contatos:', err);
      setError('Erro ao carregar as mensagens. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  // Carrega contatos ao montar o componente
  useEffect(() => {
    fetchContatos();
  }, []);

  // Formata a data de envio
  const formatarData = (dataISO) => {
    if (!dataISO) return 'Data não disponível';
    try {
      const data = new Date(dataISO);
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

  // Remove um contato por ID
  const removerContato = async (id) => {
    if (!window.confirm('Tem certeza que deseja remover esta mensagem?')) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      await axios.delete(`${CONTATOS_ENDPOINT}/${id}`);
      // Atualiza a lista localmente removendo o contato deletado
      setContatos(contatos.filter((c) => c.id !== id));
      // Opcional: Mostrar mensagem de sucesso
      console.log(`Mensagem com ID ${id} removida com sucesso.`);
    } catch (err) {
      console.error('Erro ao remover contato:', err);
      if (err.response?.data?.message) {
        setError(`Erro ao remover: ${err.response.data.message}`);
      } else {
        setError('Erro ao remover mensagem. Tente novamente.');
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Mensagens Recebidas</h2>

      {/* Mensagens de status */}
      {isLoading && <p>Carregando mensagens...</p>}
      {isDeleting && <p>Removendo mensagem...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Exibe a lista se não estiver carregando/com erro e houver contatos */}
      {!isLoading && !error && contatos.length > 0 && (
        contatos.map((c) => (
          <div key={c.id} className={styles.card}>
            <h3>{c.nome}</h3>
            <p><strong>Email:</strong> {c.email || 'Não informado'}</p>
            <p><strong>Empresa:</strong> {c.empresa || 'Não informado'}</p>
            <p><strong>Telefone:</strong> {c.telefone || 'Não informado'}</p>
            <p><strong>Assunto:</strong> {c.assunto || 'Não informado'}</p>
            <p><strong>Mensagem:</strong> {c.mensagem || 'Não informado'}</p>

            {/* Exibe a data de envio se existir */}
            {c.dataEnvio && (
              <p><strong>Data de envio:</strong> {formatarData(c.dataEnvio)}</p>
            )}

            <div className={styles.botoes}>
              <button
                className={styles.botaoRemover}
                onClick={() => removerContato(c.id)}
                disabled={isDeleting} // Desabilita durante a exclusão
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
