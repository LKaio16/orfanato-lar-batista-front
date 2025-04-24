import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Doacoes from './pages/Doações';
import SejaVoluntario from './pages/SejaVoluntrio';
import Galeria from './pages/Galeria';
import Noticias from './pages/Noticias';
import Login from './pages/Login';
import DashboardPage from './pages/Dashboard';
import CriarNoticia from './pages/CriarNoticia';
import AdicionaFotos from './pages/AdicionarFotos';
import ListaVoluntarios from './pages/ListaVoluntaios';
import VisualizarContatos from './pages/VisualizarContatos';
import Navbar from './components/navbar/navbar';
import traducoes from './translations/traducoes';
import { useIdioma } from './context/IdiomaContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  const { idioma } = useIdioma();
  const t = traducoes[idioma];

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home t={t} />} />
        <Route path="/doações" element={<Doacoes t={t} />} />
        <Route path="/SejaVoluntario" element={<SejaVoluntario t={t} />} />
        <Route path="/Galeria" element={<Galeria t={t} />} />
        <Route path="/Noticias" element={<Noticias t={t} />} />
        <Route path="/Login" element={<Login t={t} />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/criar-noticia" element={<CriarNoticia />} />
          <Route path="/adicionar-fotos" element={<AdicionaFotos />} />
          <Route path="/lista-voluntarios" element={<ListaVoluntarios />} />
          <Route path="/visualizar-contatos" element={<VisualizarContatos />} />
        </Route>

        <Route path="*" element={<Home t={t} />} />
      </Routes>
    </Router>
  );
}

export default App;
