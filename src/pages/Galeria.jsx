import Navbar from '../components/navbar/navbar';
import WhatsAppWiper from '../components/whatsappwiper/whatsappwiper';
import InstagramWiper from '../components/Instagramwiper/Instagramwiper';
import Galeria from '../components/galeria/galeria';

export default function sejavoluntario() {
  return (
    <>
      <InstagramWiper/>
      <WhatsAppWiper/>
      <Navbar />
      <Galeria />
      </>
  );
}
