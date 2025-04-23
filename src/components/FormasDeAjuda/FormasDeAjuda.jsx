import React from 'react';
import styles from './FormasDeAjuda.module.css';
import { useIdioma } from '../../context/IdiomaContext'; // Importar o hook de idioma
import traducoes from '../../translations/traducoes'; // Importar o arquivo de traduções

// Importe suas imagens (substitua pelos caminhos reais)
import iconMoney from '/assets/icon-money.png';
import iconFood from '/assets/icon-food.png';
import iconVolunteer from '/assets/icon-volunteer.png';
import iconMaterials from '/assets/icon-materials.png';

export default function FormasDeAjuda() {
    const { idioma } = useIdioma(); // Usar o hook para obter o idioma atual
    const t = traducoes[idioma]; // Acessar as traduções para o idioma atual

    // Mova a definição dos cards para dentro do componente
    // para que possam usar as traduções dinamicamente
    const cards = [
        {
            title: t.AjudaMonetariaTitulo, // Usar tradução
            text: t.AjudaMonetariaTexto,   // Usar tradução
            icon: iconMoney
        },
        {
            title: t.DoacaoAlimentosTitulo, // Usar tradução
            text: t.DoacaoAlimentosTexto,   // Usar tradução
            icon: iconFood
        },
        {
            title: t.SejaVoluntarioTitulo,  // Usar tradução
            text: t.SejaVoluntarioTexto,    // Usar tradução
            icon: iconVolunteer
        },
        {
            title: t.OutrosMateriaisTitulo, // Usar tradução
            text: t.OutrosMateriaisTexto,   // Usar tradução
            icon: iconMaterials
        }
    ];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* Usar as traduções para os títulos */}
                <h2 className={styles.smallTitle}>{t.FormasDeAjudaTituloPequeno}</h2>
                <h3 className={styles.bigTitle}>{t.FormasDeAjudaTituloGrande1}</h3>
                <p className={styles.bigTitle}>{t.FormasDeAjudaTituloGrande2}</p>

                <div className={styles.cardsContainer}>
                    {cards.map((card, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <img src={card.icon} alt="" className={styles.cardIcon} /> {/* Considere adicionar alt text traduzido aqui também */}
                                <h4 className={styles.cardTitle}>{card.title}</h4>
                            </div>
                            <div className={styles.cardDivider}></div>
                            <p className={styles.cardText}>{card.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}