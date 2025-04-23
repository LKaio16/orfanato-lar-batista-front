import Navbar from '../components/navbar/navbar';
import Doação from '../components/Doações/DoaçãoAlimentos';
import WhatsAppWiper from '../components/whatsappwiper/whatsappwiper';
import InstagramWiper from '../components/Instagramwiper/Instagramwiper';

export default function Doações() {
  return (
    <>
      <InstagramWiper />
      <WhatsAppWiper />
      <Navbar />
      <Doação />
    </>
  );
}
