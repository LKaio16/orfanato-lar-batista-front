import React, { useState } from 'react';
import styles from './Contato.module.css'; // Usaremos este CSS Module
import { useIdioma } from '../../context/IdiomaContext'; // Importar o hook de idioma
import traducoes from '../../translations/traducoes'; // Importar o arquivo de traduções

// Define a URL base da API, seguindo o padrão do seu projeto
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const CONTATO_ENDPOINT = `${API_BASE_URL}/contatos`; // O endpoint específico para contatos

export default function Contato() {
    const { idioma } = useIdioma(); // Usar o hook para obter o idioma atual
    const t = traducoes[idioma]; // Acessar as traduções para o idioma atual

    // Estados para controlar os campos do formulário (Controlled Components)
    const [formData, setFormData] = useState({
        nome: '',
        empresa: '',
        telefone: '',
        email: '',
        assunto: '',
        mensagem: ''
    });

    // Estados para o processo de envio
    const [isLoading, setIsLoading] = useState(false);
    const [mensagemEnviada, setMensagemEnviada] = useState(false);
    const [error, setError] = useState(null);

    // Função para atualizar o estado quando um campo muda
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Função para lidar com o envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previne o recarregamento da página
        setIsLoading(true);
        setError(null);
        setMensagemEnviada(false);

        console.log("Enviando dados para o backend:", formData); // Para depuração

        try {

            const response = await fetch(CONTATO_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Envia os dados do formulário como JSON
            });

            // Verifica se a resposta foi bem-sucedida (status 2xx)
            if (!response.ok) {
                // Tenta ler o corpo da resposta para mais detalhes do erro
                let errorMessage = t.ContatoMensagemErroPadrao;
                try {
                    const errorBody = await response.json();
                    // Adapte isso dependendo da estrutura de erro que seu backend retorna
                    errorMessage = errorBody.message || errorBody.error || errorMessage;
                } catch (jsonError) {
                    // Se não conseguir ler o JSON de erro, usa a mensagem padrão
                    console.error("Erro ao parsear JSON de erro:", jsonError);
                }
                throw new Error(errorMessage);
            }

            // O backend retorna o objeto Contato criado com status 201
            const contatoCriado = await response.json();
            console.log("Contato enviado com sucesso:", contatoCriado);

            // Se chegou aqui, o envio foi bem-sucedido
            setMensagemEnviada(true);

            // Limpa o formulário apenas em caso de sucesso
            setFormData({
                nome: '', empresa: '', telefone: '', email: '', assunto: '', mensagem: ''
            });

        } catch (err) {
            console.error("Erro no envio do formulário:", err);
            // Usa a mensagem de erro capturada ou a mensagem padrão traduzida
            setError(err.message || t.ContatoMensagemErroPadrao);
        } finally {
            setIsLoading(false); // Termina o estado de carregamento
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* Coluna de Texto (Esquerda) */}
                <div className={styles.textColumn}>
                    {/* Usar as traduções para os títulos e parágrafo */}
                    <p className={styles.smallTitle}>{t.ContatoTituloPequeno}</p>
                    <h2 className={styles.bigTitle}>
                        {t.ContatoTituloGrande.split('<br />').map((item, key) => { // Divide o título grande por <br /> para quebra de linha
                            return (
                                <React.Fragment key={key}>
                                    {item}
                                    {key < t.ContatoTituloGrande.split('<br />').length - 1 && <br />} {/* Adiciona <br /> se não for o último item */}
                                </React.Fragment>
                            )
                        })}
                    </h2>
                    <p className={styles.paragraph}>
                        {t.ContatoParagrafo}
                    </p>
                </div>

                {/* Coluna do Formulário (Direita) */}
                <div className={styles.formColumn}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        {/* Nome Completo */}
                        <input
                            type="text"
                            name="nome" // Atributo name é essencial
                            placeholder={t.ContatoPlaceholderNome} // Usar tradução para placeholder
                            className={styles.inputField}
                            value={formData.nome}
                            onChange={handleChange}
                            required
                            minLength={3}
                            disabled={isLoading}
                        />

                        {/* E-mail */}
                        <input
                            type="email"
                            name="email"
                            placeholder={t.ContatoPlaceholderEmail} // Usar tradução para placeholder
                            className={styles.inputField}
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                        />

                        {/* Empresa e Telefone lado a lado */}
                        <div className={styles.inlineInputs}>
                            <input
                                type="text"
                                name="empresa"
                                placeholder={t.ContatoPlaceholderEmpresa} // Usar tradução para placeholder
                                className={`${styles.inputField} ${styles.halfWidth}`}
                                value={formData.empresa}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                            <input
                                type="tel"
                                name="telefone"
                                placeholder={t.ContatoPlaceholderTelefone} // Usar tradução para placeholder
                                className={`${styles.inputField} ${styles.halfWidth}`}
                                value={formData.telefone}
                                onChange={handleChange}
                                required
                                // Pattern mais flexível para telefone BR: (XX) 9XXXX-XXXX ou XXXXXXXX etc.
                                pattern="^\s*(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}\s*$"
                                title={t.ContatoTelefoneTitle} // Usar tradução para o título/tooltip
                                disabled={isLoading}
                            />
                        </div>

                        {/* Assunto */}
                        <input
                            type="text"
                            name="assunto"
                            placeholder={t.ContatoPlaceholderAssunto} // Usar tradução para placeholder
                            className={styles.inputField}
                            value={formData.assunto}
                            onChange={handleChange}
                            required
                            minLength={5}
                            disabled={isLoading}
                        />

                        {/* Mensagem */}
                        <textarea
                            name="mensagem"
                            placeholder={t.ContatoPlaceholderMensagem} // Usar tradução para placeholder
                            className={styles.textarea}
                            value={formData.mensagem}
                            onChange={handleChange}
                            required
                            minLength={10}
                            rows={5} // Altura inicial
                            disabled={isLoading}
                        ></textarea>

                        {/* Mensagens de Status (Sucesso/Erro) - Coloquei ANTES do botão */}
                        {mensagemEnviada && (
                            <p className={styles.successMessage}>
                                {t.ContatoMensagemSucesso} {/* Usar tradução */}
                            </p>
                        )}
                        {error && (
                            <p className={styles.errorMessage}>
                                {error} {/* O erro pode vir da API, mas o padrão é traduzido */}
                            </p>
                        )}

                        {/* Botão de Envio */}
                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={isLoading} // Desabilita o botão durante o envio
                        >
                            {/* Usar traduções para o texto do botão */}
                            {isLoading ? t.ContatoBotaoEnviando : t.ContatoBotaoEnviar}
                        </button>

                    </form>
                </div>
            </div>
        </section>
    );
}