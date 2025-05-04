import React from 'react';
import styles from './HeroSection.module.css';
import { useNavigate } from "react-router-dom";
import { useIdioma } from '../../context/IdiomaContext';
import traducoes from '../../translations/traducoes';


export default function HeroSection() {
    const navigate = useNavigate();
    const { idioma } = useIdioma();
    const t = traducoes[idioma];

    return (
        <section className={styles.hero}>

            {/* Círculo decorativo */}
            <div className={styles.circleDecoration}></div>

            {/* Quadrado decorativo */}
            <div className={styles.squareDecoration}></div>

            <div className={styles.heroContent}>
                <div className={styles.textContainer}>
                    <h1>{t.HeroTitulo}</h1>
                    <p>{t.HeroDescricao}</p>

                    <button
                        className={styles.donateButton}
                        onClick={() => navigate("/doações")}
                    >
                        {t.Doar}
                    </button>
                </div>

                <div className={styles.imageContainer}>
                    <img
                        src="/assets/hero-image.png"
                        alt="Crianças no Lar Batista"
                        className={styles.heroImage}
                    />
                </div>
            </div>
        </section>
    );
}