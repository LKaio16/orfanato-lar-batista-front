import Navbar from '../components/navbar/navbar';
import Sobre from './../components/Sobre/Sobre';
import SobreNos from '../components/SobreNos/SobreNos';
import VideoContainer from './../components/video/videocontainer';
import HeroSection from '../components/HeroSection/HeroSection';
import UltimasNoticias from '../components/ultimanoticia/ultimasnoticias';
import MeioContato from '../components/Contato/meiocontato'
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

