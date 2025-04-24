import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './VerVoluntarios.module.css';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const VOLUNTARIOS_ENDPOINT = `${API_BASE_URL}/voluntarios`;

const VerVoluntarios = () => {
  const [voluntarios, setVoluntarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Carregamento inicial
  const [error, setError] = useState(null); // Mensagens de erro
  const [isDeleting, setIsDeleting] = useState(false); // Indica exclusão em andamento

  // Busca a lista de voluntários do backend
  const fetchVoluntarios = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(VOLUNTARIOS_ENDPOINT);
      setVoluntarios(response.data);
    } catch (err) {
      console.error('Erro ao buscar voluntários:', err);
      setError('Erro ao carregar a lista de voluntários. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  // Carrega voluntários ao montar o componente
  useEffect(() => {
    fetchVoluntarios();
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

  // Remove um voluntário por ID
  const removerVoluntario = async (id) => {
    if (!window.confirm('Tem certeza que deseja remover este voluntário?')) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      await axios.delete(`${VOLUNTARIOS_ENDPOINT}/${id}`);
      // Atualiza a lista localmente removendo o voluntário deletado
      setVoluntarios(voluntarios.filter((v) => v.id !== id));
      // Opcional: Mostrar mensagem de sucesso
      console.log(`Voluntário com ID ${id} removido com sucesso.`);
    } catch (err) {
      console.error('Erro ao remover voluntário:', err);
      if (err.response?.data?.message) {
        setError(`Erro ao remover: ${err.response.data.message}`);
      } else {
        setError('Erro ao remover voluntário. Tente novamente.');
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Lista de Voluntários</h2>

      {/* Mensagens de status */}
      {isLoading && <p>Carregando voluntários...</p>}
      {isDeleting && <p>Removendo voluntário...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Exibe a lista se não estiver carregando/com erro e houver voluntários */}
      {!isLoading && !error && voluntarios.length > 0 && (
        voluntarios.map((v) => (
          <div key={v.id} className={styles.card}>
            <h3>{v.nome}</h3>
            <p><strong>Email:</strong> {v.email || 'Não informado'}</p>
            <p><strong>Telefone:</strong> {v.telefone || 'Não informado'}</p>
            <p><strong>Habilidades:</strong> {v.habilidades || 'Não informado'}</p>
            <p><strong>Disponibilidade:</strong> {Array.isArray(v.disponibilidade) && v.disponibilidade.length > 0 ? v.disponibilidade.join(', ') : 'Não informada'}</p>
            <p><strong>Bio:</strong> {v.bio || 'Não informado'}</p>
            <p><strong>Motivo:</strong> {v.motivo || 'Não informado'}</p>

            {/* Exibe a data de envio se existir */}
            {v.dataEnvio && (
              <p><strong>Data de envio:</strong> {formatarData(v.dataEnvio)}</p>
            )}

            <div className={styles.botoes}>
              <button
                className={styles.botaoRemover}
                onClick={() => removerVoluntario(v.id)}
                disabled={isDeleting}
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
