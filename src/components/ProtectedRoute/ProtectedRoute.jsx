import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ redirectPath = '/login', children }) => {
    // Verifica se as informações do usuário estão no localStorage
    const usuarioLogado = localStorage.getItem('usuarioLogado');

    if (!usuarioLogado) {
        // Se não estiver logado, redireciona para a página de login
        return <Navigate to={redirectPath} replace />;
    }

    // Se estiver logado, renderiza os componentes filhos (a rota solicitada)
    // Outlet é usado quando ProtectedRoute envolve outras rotas aninhadas,
    // caso contrário, 'children' renderiza o elemento diretamente.
    return children ? children : <Outlet />;
};

export default ProtectedRoute;