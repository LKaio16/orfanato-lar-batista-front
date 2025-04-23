import styles from "./meiocontato.module.css";
import axios from "axios";
import { useState } from "react";

const Contato = () => {
  const [mensagemEnviada, setMensagemEnviada] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = {
      nome: e.target[0].value,
      empresa: e.target[1].value,
      telefone: e.target[2].value,
      email: e.target[3].value,
      assunto: e.target[4].value,
      mensagem: e.target[5].value
    };

    try {
      await axios.post("http://localhost:8080/api/contatos", formData);
      setMensagemEnviada(true);
      e.target.reset();

      // Resetar mensagem de sucesso após 5 segundos
      setTimeout(() => setMensagemEnviada(false), 5000);
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
      setError("Erro ao enviar mensagem. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoSection}>
        <h2>Fale com a gente!</h2>
        <p>Juntos levaremos oportunidades para milhares de vidas de crianças, adolescentes e suas famílias.</p>
        <hr className={styles.yellowLine} />
        <p>(11) 3208-3074</p>
        <p>atendimento@larbatista.com.br</p>
        <p>R. Antônio Botelho, 184 - Serrinha <br />Fortaleza - CE, CEP 60741-110</p>
      </div>

      <div className={styles.formSection}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome Completo"
            className={styles.fullWidth}
            required
            minLength={3}
          />

          <div className={styles.inlineInputs}>
            <input
              type="text"
              placeholder="Empresa"
              className={styles.halfWidth}
            />
            <input
              type="tel"
              placeholder="Telefone"
              className={styles.halfWidth}
              required
              pattern="[0-9]{10,11}"
              title="Digite um telefone válido (DDD + número)"
            />
          </div>

          <input
            type="email"
            placeholder="E-mail"
            className={styles.fullWidth}
            required
          />

          <input
            type="text"
            placeholder="Assunto"
            className={styles.fullWidth}
            required
            minLength={5}
          />

          <textarea
            placeholder="Escreva aqui sua mensagem"
            className={styles.textarea}
            required
            minLength={10}
          ></textarea>

          <button
            type="submit"
            className={styles.button}
            disabled={isLoading}
          >
            {isLoading ? 'Enviando...' : 'Enviar'}
          </button>

          {mensagemEnviada && (
            <p className={styles.successMessage}>
              ✅ Sua mensagem foi enviada com sucesso!
            </p>
          )}

          {error && (
            <p className={styles.errorMessage}>
              ❌ {error}
            </p>
          )}
        </form>
      </div>

      <div className={styles.mapSection}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.6271795639477!2d-38.5485106!3d-3.7795983999999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c74ebf7c09e43d%3A0xfea0d518c7eea262!2sLar%20Batista!5e1!3m2!1spt-BR!2sbr!4v1743464725931!5m2!1spt-BR!2sbr"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Localização do Lar Batista"
        ></iframe>
      </div>
    </div>
  );
};

export default Contato;