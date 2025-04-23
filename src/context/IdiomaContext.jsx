// src/context/IdiomaContext.jsx
import { createContext, useContext, useState } from 'react';

const IdiomaContext = createContext();

export function IdiomaProvider({ children }) {
    const [idioma, setIdioma] = useState('BR');

    return (
        <IdiomaContext.Provider value={{ idioma, setIdioma }}>
            {children}
        </IdiomaContext.Provider>
    );
}

export const useIdioma = () => useContext(IdiomaContext);