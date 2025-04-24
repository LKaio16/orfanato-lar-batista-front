import React, { useState } from 'react';
import axios from 'axios';
import styles from './containervoluntario.module.css'; // Importe seu CSS Module
import { useIdioma } from '../../context/IdiomaContext'; // Importar o hook de idioma
import traducoes from '../../translations/traducoes'; // Importar o arquivo de traduções


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const VOLUNTARIOS_ENDPOINT = `${API_BASE_URL}/voluntarios`;


const ContainerVoluntario = () => {
  const { idioma } = useIdioma(); // Usar o hook para obter o idioma atual
  const t = traducoes[idioma]; // Acessar as traduções para o idioma atual

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    habilidades: '',
    disponibilidade: [],
    bio: '',
    motivo: ''
  });

  // Estados para o processo de envio
  const [isLoading, setIsLoading] = useState(false);
  const [mensagemEnviada, setMensagemEnviada] = useState(false);
  const [error, setError] = useState(null);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prev) => {
        const novaDisponibilidade = checked
          ? [...prev.disponibilidade, value]
          : prev.disponibilidade.filter((d) => d !== value);
        return { ...prev, disponibilidade: novaDisponibilidade };
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);
    setMensagemEnviada(false);

    try {
      // Use a constante do endpoint aqui
      await axios.post(VOLUNTARIOS_ENDPOINT, {
        ...formData,
        // dataEnvio will be automatically set by the backend
      });

      // Usar tradução para a mensagem de sucesso e definir estado
      setMensagemEnviada(true);
      setError(null); // Limpa qualquer erro anterior

      // Reset form after successful submission
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        habilidades: '',
        disponibilidade: [],
        bio: '',
        motivo: ''
      });

    } catch (err) {
      console.error('Erro ao cadastrar voluntário:', err);
      // Usar a mensagem de erro da API ou a mensagem padrão traduzida e definir estado
      setError(err.response?.data?.message || err.message || t.SejaVoluntarioErro || t.SejaVoluntarioErroInesperado);
      setMensagemEnviada(false); // Garante que a mensagem de sucesso não apareça
    } finally {
      setIsLoading(false);
    }
  };

  // Array para mapear valores do checkbox para as traduções
  const checkboxOptions = [
    { value: 'Manhã', labelKey: 'SejaVoluntarioOpcaoManha' },
    { value: 'Tarde', labelKey: 'SejaVoluntarioOpcaoTarde' },
    { value: 'Noite', labelKey: 'SejaVoluntarioOpcaoNoite' },
  ];


  return (
    <section className={styles.section}> {/* Usar a classe section */}
      <div className={styles.container}> {/* Usar a classe container */}

        {/* Coluna de Texto (Esquerda) - Renomeada para .textColumn */}
        <div className={styles.textColumn}>
          {/* Usar títulos e parágrafos com estilos e traduções */}
          {/* Adicionar um título pequeno se desejar, seguindo o padrão */}
          {/* <p className={styles.smallTitle}>{t.SejaVoluntarioTituloPequeno || 'SEJA VOLUNTÁRIO'}</p> */}
          <h2 className={styles.bigTitle}>{t.SejaVoluntarioTituloGrande || 'Faça a diferença na vida de uma criança'}</h2>
          <p className={styles.paragraph}>{t.SejaVoluntarioSubtitulo || 'Junte-se a nós e dedique seu tempo e talento para transformar realidades no Lar Batista.'}</p> {/* Adicionado um subtítulo */}

          {/* Conteúdo original da coluna esquerda (Por que se voluntariar?) */}
          <div className={styles.whyVolunteer}> {/* Nova div para o conteúdo "Por que se voluntariar?" */}
            <h3 className={styles.smallTitle}>{t.SejaVoluntarioTituloPorQue || 'Por que se voluntariar?'}</h3> {/* Usar smallTitle para subtítulo */}
            <p className={styles.paragraph}>{t.SejaVoluntarioParagrafoPorQue || 'O coração de um voluntário não é medido pelo tamanho...'}</p>
          </div>
          {/* Você pode adicionar a imagem aqui se desejar, similar ao SobreNos */}
          {/* <div className={styles.imageContainer}>
                <img src="/assets/sua-imagem-aqui.png" alt={t.SejaVoluntarioImagemAlt || "Imagem Voluntariado"} className={styles.image} />
           </div> */}
        </div>

        {/* Coluna do Formulário (Direita) - Renomeada para .formColumn */}
        <div className={styles.formColumn}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label>{t.SejaVoluntarioLabelNome || 'Nome completo'}</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              className={styles.inputField} // Usar a classe de estilo consistente
              disabled={isLoading}
            />

            <label>{t.SejaVoluntarioLabelEmail || 'E-mail'}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.inputField} // Usar a classe de estilo consistente
              disabled={isLoading}
            />

            <label>{t.SejaVoluntarioLabelTelefone || 'Telefone'}</label>
            <input
              type="text" // Pode ser 'tel' dependendo da validação desejada
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              required
              className={styles.inputField} // Usar a classe de estilo consistente
              disabled={isLoading}
            />

            <label>{t.SejaVoluntarioLabelHabilidades || 'Habilidades'}</label>
            <textarea
              rows="3"
              name="habilidades"
              value={formData.habilidades}
              onChange={handleChange}
              className={styles.textarea} // Usar a classe de estilo consistente
              disabled={isLoading}
            ></textarea>

            <label>{t.SejaVoluntarioLabelDisponibilidade || 'Disponibilidade'}</label>
            <div className={styles.checkboxGroup}>
              {checkboxOptions.map((option) => (
                <label key={option.value}>
                  <input
                    type="checkbox"
                    name="disponibilidade"
                    value={option.value} // Manter o valor interno (BR) ou ajustar API/lógica se precisar enviar traduzido
                    checked={formData.disponibilidade.includes(option.value)}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  {t[option.labelKey] || option.value} {/* Usar tradução para o texto visível */}
                </label>
              ))}
            </div>

            <label>{t.SejaVoluntarioLabelBio || 'Mini bio'}</label>
            <textarea
              rows="3"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className={styles.textarea} // Usar a classe de estilo consistente
              disabled={isLoading}
            ></textarea>

            <label>{t.SejaVoluntarioLabelMotivo || 'Por que deseja ser voluntário?'}</label>
            <textarea
              rows="3"
              name="motivo"
              value={formData.motivo}
              onChange={handleChange}
              className={styles.textarea} // Usar a classe de estilo consistente
              required // Adicionado required, ajuste se não for obrigatório
              disabled={isLoading}
            ></textarea>

            {/* Mensagens de Status (Sucesso/Erro) */}
            {mensagemEnviada && (
              <p className={styles.successMessage}>
                {t.SejaVoluntarioSucesso || '✅ Sua inscrição como voluntário foi enviada com sucesso! Aguarde nosso contato.'}
              </p>
            )}
            {error && (
              <p className={styles.errorMessage}>
                {error} {/* Exibe o erro retornado ou o fallback traduzido */}
              </p>
            )}

            <button type="submit" className={styles.submitButton} disabled={isLoading}> {/* Usar classe e estado de loading */}
              {isLoading ? t.ContatoBotaoEnviando || 'Enviando...' : t.SejaVoluntarioBotaoEnviar || 'ENVIAR'} {/* Texto do botão traduzido */}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContainerVoluntario;
