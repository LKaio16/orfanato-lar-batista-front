import Navbar from '../components/navbar/navbar';
import SobreNos from '../components/SobreNos/SobreNos';
import HeroSection from '../components/HeroSection/HeroSection';
import UltimasNoticias from '../components/ultimanoticia/ultimasnoticias';
import WhatsAppWiper from '../components/whatsappwiper/whatsappwiper';
import InstagramWiper from '../components/Instagramwiper/Instagramwiper';
import { useIdioma } from '../context/IdiomaContext';
import traducoes from '../translations/traducoes';
import FormasDeAjuda from '../components/FormasDeAjuda/FormasDeAjuda';
import Contato from '../components/Contato/Contato';
import Footer from '../components/Footer/Footer';

export default function Home() {
  const { idioma } = useIdioma();
  const t = traducoes[idioma];
  return (
    <>

      <Navbar />
      <InstagramWiper />
      <WhatsAppWiper />
      <HeroSection />
      <FormasDeAjuda />
      <UltimasNoticias />
      <SobreNos />
      <Contato />
      <Footer />

    </>
  );
}

