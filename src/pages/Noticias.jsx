import Navbar from '../components/navbar/navbar';
import WhatsAppWiper from '../components/whatsappwiper/whatsappwiper';
import InstagramWiper from '../components/Instagramwiper/Instagramwiper';
import TodasNoticias from '../components/todasnoticias/todasnoticias';

export default function sejavoluntario() {
  return (
    <>
      <InstagramWiper/>
      <WhatsAppWiper/>
      <Navbar />
      <TodasNoticias/>
      </>
  );
}
