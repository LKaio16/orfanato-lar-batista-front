import React, { useState } from 'react';
import styles from './Contato.module.css'; // Usaremos este CSS Module
import { useIdioma } from '../../context/IdiomaContext'; // Importar o hook de idioma
import traducoes from '../../translations/traducoes'; // Importar o arquivo de traduções


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

        console.log("Enviando dados:", formData); // Para depuração

        // ============================================================
        // AQUI VAI A SUA LÓGICA DE ENVIO PARA O BACKEND (FETCH/AXIOS)
        // Exemplo simulado:
        try {
            // Simula uma chamada de API que demora 1.5 segundos
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Descomente a linha abaixo para simular um erro:
            // throw new Error("Falha ao conectar com o servidor. Tente mais tarde.");

            // Se chegou aqui, o envio (simulado) foi bem-sucedido
            setMensagemEnviada(true);
            // Limpa o formulário
            setFormData({
                nome: '', empresa: '', telefone: '', email: '', assunto: '', mensagem: ''
            });

        } catch (err) {
            console.error("Erro no envio:", err);
            // Usa a mensagem de erro do catch ou a mensagem padrão traduzida
            setError(err.message || t.ContatoMensagemErroPadrao);
        } finally {
            setIsLoading(false); // Termina o estado de carregamento
        }
        // ============================================================
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
                            disabled={isLoading}
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